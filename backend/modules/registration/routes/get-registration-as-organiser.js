const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'GET',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const registration = await RegistrationController.getFullRegistration(
                request.event._id,
                request.params.registrationId
            )
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Get registration as organiser',
            description: 'Get a given registration as an organiser',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description:
                            'The slug of the event the registration belongs to',
                    },
                    registrationId: {
                        type: 'string',
                        description: 'The ID of the registration to get',
                    },
                },
                ['slug', 'registrationId']
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
