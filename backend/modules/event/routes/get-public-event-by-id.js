const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const { id } = request.params
            const event = await EventController.getPublicEventById(id)
            return reply.code(status.OK).sendData(event)
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
            },
            errorResponses: [status.NOT_FOUND],
        },
    })
}
