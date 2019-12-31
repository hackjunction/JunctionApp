const status = require('http-status')
const EventController = require('../../controller')

module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const events = await EventController.getPublicEvents()
            return reply.code(status.OK).send(events)
        },
        schema: {
            summary: 'Get public events',
            description: 'Get all events which have been published',
            tags: ['Events'],
            response: {
                [status.OK]: fastify.responseArray(
                    status.OK,
                    fastify.refs.Event
                ),
            },
        },
    })

    fastify.route({
        method: 'GET',
        url: '/:slug',
        handler: async (request, reply) => {
            const event = await EventController.getPublicEventBySlug(
                request.params.slug
            )
            return reply.code(status.OK).send(event)
        },
        schema: {
            summary: 'Get public event by slug',
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description: 'A valid slug for an event',
                    },
                },
                ['slug']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Event
                ),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })

    fastify.route({
        method: 'GET',
        url: '/id/:id',
        handler: async (request, reply) => {
            const event = await EventController.getPublicEventById(
                request.params.id
            )
            return reply.code(status.OK).send(event)
        },
        schema: {
            summary: 'Get public event by id',
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    id: {
                        type: 'string',
                        description: 'A valid id for an event',
                    },
                },
                ['id']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Event
                ),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })
}
