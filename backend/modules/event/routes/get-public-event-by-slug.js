const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const { slug } = request.params
            const event = await EventController.getPublicEventBySlug(slug)
            return reply.code(status.OK).sendData(event)
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
}
