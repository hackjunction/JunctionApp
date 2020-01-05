const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const registration = await RegistrationController.editRegistration(
                request.params.registrationId,
                request.event,
                request.body,
                request.user
            )
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Edit registration as organiser',
            description: 'Edit a given registration as an organiser',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    registrationId: {
                        type: 'string',
                        description: 'The ID of the registration to edit',
                    },
                },
                ['registrationId']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
            errorResponses: [status.NOT_FOUND],
        },
    })
}
