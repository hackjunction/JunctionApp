const path = require('path')
const throng = require('throng')
const helmet = require('fastify-helmet')
const _fastify = require('fastify')

/* Prepare config */
require('./misc/config')

/** Set up logging */
const logger = require('./misc/logger')

/** Create Fastify application */
const fastify = _fastify({
    logger,
})

// Enable route logging by uncommenting this line

/** Use helmet for some basic security measures */
fastify.register(
    helmet,
    // Example of passing an option to x-powered-by middleware
    { hidePoweredBy: { setTo: 'PHP 4.2.0' } }
)

/* Force SSL Redirect in production */
// TODO: See how this can be done with fastify
// app.use(sslRedirect(['production'], 301))

// TODO:  Make sure missing this isn't a problem
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// )

/* Register decorators */
fastify.register(require('./decorators'))

/* Register plugins */
fastify.register(require('./plugins'))

/* Register API routes */
fastify.register(require('./modules/routes'), {
    prefix: '/api',
})

/** Serve frontend at all other routes */
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'build'),
})

fastify.get('*', function(req, reply) {
    reply.sendFile('index.html')
})

/* Global error handler */
// TODO: Figure out how to replace this
// app.use(require('./common/errors/errorHandler'))

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
    start: async () => {
        const PORT = process.env.PORT || 2222
        try {
            await fastify.listen(PORT)
            logger.info(
                `Worker ${process.pid} started, listening on port ${PORT}`
            )
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    },
})
