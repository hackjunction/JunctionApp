const express = require('express')
const { errors } = require('celebrate')
const path = require('path')
const helmet = require('helmet')
// const sslRedirect = require('heroku-ssl-redirect')

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
// app.use(
//     require('prerender-node').set(
//         'prerenderToken',
//         process.env.PRERENDER_TOKEN,
//     ),
// )

/* Force SSL Redirect in production */
//app.use(sslRedirect(['production'], 301))

/* Enable body-parser */
app.use(express.json())
app.use(
    express.urlencoded({
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
const httpServer = require('./modules/graphql')

// const httpServer = require('./modules/graphql')(app)

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
//let gfs = require('./misc/db').gfs

// const storage = require('./misc/gridfs').storage
// const upload = require('./misc/gridfs').upload
const migrations = require('./migrations/index')

/** A clone of the npm library throng, with a minor edit. See the file for details. */
const throng = require('./misc/throng')

const memoryUsage = () => {
    const formatMemoryUsage = data =>
        `${Math.round((data / 1024 / 1024) * 100) / 100} MB`

    const memoryData = process.memoryUsage()

    const memoryUsage = {
        rss: `${formatMemoryUsage(
            memoryData.rss,
        )} -> Resident Set Size - total memory allocated for the process execution`,
        heapTotal: `${formatMemoryUsage(
            memoryData.heapTotal,
        )} -> total size of the allocated heap`,
        heapUsed: `${formatMemoryUsage(
            memoryData.heapUsed,
        )} -> actual memory used during the execution`,
        external: `${formatMemoryUsage(
            memoryData.external,
        )} -> V8 external memory`,
    }

    console.log(memoryUsage)
}

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
    start: async () => {
        await httpServer(app)
        // const PORT = process.env.PORT || 2222

        // await new Promise(resolve => {
        //     console.log('httpServer.listen', { port: PORT })
        //     return httpServer.listen({ port: PORT }, resolve)
        // }).catch(err => {
        //     console.error('httpServer.listen error')
        //     console.error(err)
        // })

        logger.info(
            `Worker ${process.pid} started, listening on port ${
                process.env.PORT || 2222
            }`,
        )

        memoryUsage()
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
