const express = require('express')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const path = require('path')
const helmet = require('helmet')
const sslRedirect = require('heroku-ssl-redirect')

/** Create Express application */
const app = express()

/* Prepare config */
require('./misc/config')

/** Set up logging */
const logger = require('./misc/logger')

// Enable route logging by uncommenting this line
/** Use helmet for some basic security measures */
app.use(helmet())

/* Prerender */
app.use(
    require('prerender-node').set(
        'prerenderToken',
        process.env.PRERENDER_TOKEN,
    ),
)

/* Force SSL Redirect in production */
app.use(sslRedirect(['production'], 301))

/* Enable body-parser */
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

/* JWT-middleware from all requests */
const { verifyToken, parseToken } = require('./misc/jwt')

app.use(verifyToken)
app.use(parseToken)

/* Register API routes */
require('./modules/routes')(app)

/* Register GraphQL server */
const httpServer = require('./modules/graphql')(app)

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

/* Database connection */
require('./misc/db').connect()

const migrations = require('./migrations/index')

/** A clone of the npm library throng, with a minor edit. See the file for details. */
const throng = require('./misc/throng')

throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    grace: 1000,
    lifetime: Infinity,
    /** Start the master process. The server will start the slave processes
     *  (and thus begin accepting requests) only once this function has resolved...
     */
    master: async () => {
        logger.info(`Master ${process.pid} started`)
        // ...so this is a good place to run e.g. database migrations
        await migrations.run()
    },
    /** Start the slave processes (1-n), which listen for incoming requests */
    start: () => {
        const PORT = process.env.PORT || 2222

        httpServer.listen(PORT, () => {
            logger.info(
                `Worker ${process.pid} started, listening on port ${PORT}`,
            )
        })
    },
    /** This is run only if the master function errors out, which means the
     *  server could not start properly. Workers are automatically revived on failure, if e.g.
     *  the app crashes or runs out of memory while processing a request.
     */
    onError: err => {
        logger.error({
            message: 'Server startup failed',
            error: {
                message: err.message,
                stack: err.stack,
            },
        })
        process.exit(1)
    },
})
