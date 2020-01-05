const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const registration = await RegistrationController.assignRegistrationForEvent(
                request.params.registrationId,
                request.params.userId
            )

            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Assign registration to user',
            description:
                'Assign a given registration to one of the event organisers',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    registrationId: {
                        description: 'The ID of the registration to re-assign',
                        type: 'string',
                    },
                    userId: {
                        description:
                            'The ID of the user to assign the registration to (Auth0 user id)',
                        type: 'string',
                    },
                },
                ['userId', 'registrationId']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
        },
    })
}
