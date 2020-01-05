const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.DELETE_EVENT], {
        method: 'DELETE',
        url: '/',
        preValidation: [fastify.events_isOwner],
        handler: async (request, reply) => {
            const deletedEvent = await EventController.deleteEventBySlug(
                request.params.slug
            )
            return reply.code(200).json(deletedEvent)
        },
        schema: {
            summary: 'Delete event by slug',
            description: 'Delete an event by slug, as the owner of the event.',
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
            },
            errorResponses: [status.NOT_FOUND],
        },
    })
}
