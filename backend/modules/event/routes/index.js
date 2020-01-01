module.exports = async (fastify, options) => {
    fastify.register(require('./get-own-events'))
    fastify.register(require('./create-event'))

    fastify.register(require('./get-event-by-slug'), {
        prefix: '/:slug',
    })
    fastify.register(require('./edit-event-by-slug'), {
        prefix: '/:slug',
    })
    fastify.register(require('./remove-event-by-slug'), {
        prefix: '/:slug',
    })

    fastify.register(require('./get-public-events'), {
        prefix: '/public',
    })

    fastify.register(require('./get-public-event-by-slug'), {
        prefix: '/public/:slug',
    })

    fastify.register(require('./get-public-event-by-id'), {
        prefix: '/public/id/:id',
    })

    fastify.register(require('./add-organiser'), {
        prefix: '/organisers/:slug/:organiserId',
    })

    fastify.register(require('./remove-organiser'), {
        prefix: '/organisers/:slug/:organiserId',
    })
}
