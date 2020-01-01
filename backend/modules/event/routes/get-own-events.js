const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const events = await EventController.getEventsByOrganiser(
                request.user
            )
            return reply.code(status.OK).send(events)
        },
        schema: {
            summary: 'Get own events',
            description: 'Get all events which you are organising',
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
