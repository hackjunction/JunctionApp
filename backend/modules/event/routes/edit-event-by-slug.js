const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const updatedEvent = await EventController.updateEvent(
                request.event,
                request.body
            )
            return reply.code(200).send(updatedEvent)
        },
        schema: {
            summary: 'Edit event by slug',
            description:
                'Edit an event by slug, as an owner or organiser of the event.',
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    slug: {
                        description: 'A valid slug for an event',
                        type: 'string',
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
