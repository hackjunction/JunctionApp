const status = require('http-status')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isRegistrant],
        handler: async (request, reply) => {
            const registration = await RegistrationController.cancelRegistration(
                request.user,
                request.event
            )
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Cancel registration',
            descriptio: 'Cancel your registration to an event',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description:
                            'The slug of the event to cancel your registration to',
                    },
                },
                ['slug']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
            errorResponses: [status.FORBIDDEN],
        },
    })
}
