const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const EventController = require('../controller')
const AuthController = require('../../auth/controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'POST',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const { organiserId } = request.params
            await AuthController.grantAssistantOrganiser(organiserId)
            const event = await EventController.addOrganiser(
                request.event,
                organiserId
            )
            return reply.code(status.OK).sendData(event.organisers)
        },
        schema: {
            summary: 'Add organiser to event',
            description: `Add another organiser to an event where you are an organiser. This will also add the \`${Auth.Roles.ASSISTANT_ORGANISER}\` role and associated permissions to the user, if they did not have it already.`,
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
                            'The userId of the user to add as an organiser to this event',
                    },
                },
                ['slug', 'organiserId']
            ),
            response: {
                [status.OK]: fastify.responseArray(status.OK, {
                    type: 'string',
                    description: 'The userId of an organiser',
                }),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })
}

// router
//     .route('/organisers/:slug/:organiserId')
//     .post(
//         hasToken,
//         hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser,
//         addOrganiser
//     )
//     .delete(
//         hasToken,
//         hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser,
//         removeOrganiser
//     )
