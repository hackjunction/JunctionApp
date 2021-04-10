const app = require('./app')

/** Set up logging */
const logger = require('./misc/logger')

/* Prepare config */
require('./misc/config')

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

        app.listen(PORT, () => {
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
