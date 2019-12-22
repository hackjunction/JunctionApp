const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { errors } = require('celebrate')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect')

/* Force SSL Redirect in production */
app.use(sslRedirect(['production'], 301))

/* Custom logging */
morgan.token('postbody', function(req) {
    return JSON.stringify(req.body)
})
if (process.env.NODE_ENV !== 'production') {
    app.use(
        morgan(
            ':method :url :status :res[content-length] - :response-time ms :postbody'
        )
    )
}

/* Enable body-parser */
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/* Prepare config */
require('./misc/config')

/* Register API routes */
require('./modules/routes')(app)

/* Serve frontend at all other routes */
if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, 'build')
    app.use(express.static(root))
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root })
    })
}

/* Handle Joi validation errors */
app.use(errors())

/* Global error handler */
app.use(require('./common/errors/errorHandler'))

/* Database */
require('./misc/db').connect()

const throng = require('throng')
const cron = require('./modules/cron/index')

/** Use throng to take advantage of all available CPU resources */
throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    grace: 1000,
    lifetime: Infinity,
    /** Start the master process (1) */
    master: () => {
        console.log(`Master ${process.pid} started`)
        /** Run cron jobs here for now, migrate to cron-cluster later */
        // cron.utils.startAll();
    },
    /** Start the slave processes (1-n) */
    start: () => {
        const PORT = process.env.PORT || 2222
        app.listen(PORT, () => {
            console.log(
                `Worker ${process.pid} started, listening on port ${PORT}`
            )
        })
    },
})
