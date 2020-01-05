const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const EventController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'DELETE',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const event = await EventController.removeOrganiser(
                request.event,
                request.params.organiserId
            )
            return reply.code(status.OK).sendData(event.organisers)
        },
        schema: {
            summary: 'Remove an organiser from an event',
            description: `Remove another organiser from an event where you are an organiser. This will also remove the \`${Auth.Roles.ASSISTANT_ORGANISER}\` role and associated permissions to the user, if they are no longer an organiser in any event.`,
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description: 'A valid slug for an event',
                    },
                    organiserId: {
                        type: 'string',
                        description:
                            'The userId of the organiser to remove from this event',
                    },
                },
                ['slug', 'organiserId']
            ),
            response: {
                [status.OK]: fastify.responseArray(status.OK, {
                    type: 'string',
                    description: 'The userId of an organiser',
                }),
            },
            errorResponses: [status.NOT_FOUND],
        },
    })
}
