const status = require('http-status')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'POST',
        url: '/',
        preValidation: [fastify.events_canRegister],
        handler: async (request, reply) => {
            const registration = await RegistrationController.createRegistration(
                request.user,
                request.event,
                request.body
            )
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Create own registration',
            description: 'Create a registration for a given event',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description: 'The event to create a registration for',
                    },
                },
                ['slug']
            ),
            body: fastify.refs.RegistrationAnswers,
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
            errorResponses: [
                status.BAD_REQUEST,
                status.FORBIDDEN,
                status.NOT_FOUND,
            ],
        },
    })
}
