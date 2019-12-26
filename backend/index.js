const express = require('express')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const path = require('path')
const helmet = require('helmet')
const sslRedirect = require('heroku-ssl-redirect')
const throng = require('throng')
const expressPino = require('express-pino-logger')
const swagger = require('swagger-spec-express')
const swaggerUi = require('swagger-ui-express')

const packageJson = require('./package.json')

/* Prepare config */
require('./misc/config')

/** Create Express application */
const app = express()

/** Set up logging */
const logger = require('./misc/logger')

// Enable route logging by uncommenting this line
app.use(expressPino({ logger }))

/** Use helmet for some basic security measures */
app.use(helmet())

/* Force SSL Redirect in production */
app.use(sslRedirect(['production'], 301))

/* Enable body-parser */
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/* Register API routes */
require('./modules/routes')(app)

/** Set up Swagger documentation */

swagger.initialise(app, {
    title: packageJson.title,
    version: packageJson.version,
})

app.get('/docs/swagger.json', function(err, res) {
    res.status(200).json(swagger.json())
}).describe({
    responses: {
        200: {
            description: 'Returns the swagger.json document',
        },
    },
})

swagger.compile()

/** Serve the Swagger UI */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger.json()))

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

// const cron = require('./modules/cron/index')

/** Use throng to take advantage of all available CPU resources */
throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    grace: 1000,
    lifetime: Infinity,
    /** Start the master process (1) */
    master: () => {
        logger.info(`Master ${process.pid} started`)
        /** Run cron jobs here for now, migrate to cron-cluster later */
        // cron.utils.startAll();
    },
    /** Start the slave processes (1-n) */
    start: () => {
        const PORT = process.env.PORT || 2222
        app.listen(PORT, () => {
            logger.info(
                `Worker ${process.pid} started, listening on port ${PORT}`
            )
        })
    },
})
