const status = require('http-status')

const EventController = require('../controller')

module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/',
        async handler(request, reply) {
            const events = await EventController.getPublicEvents()
            return reply.code(status.OK).sendData(events)
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
}
