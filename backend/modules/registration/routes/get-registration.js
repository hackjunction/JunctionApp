const status = require('http-status')

const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'GET',
        url: '/',
        preValidation: [fastify.events_attachEvent],
        handler: async (request, reply) => {
            const registration = await RegistrationController.getRegistration(
                request.user.sub,
                request.event._id
            )
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'Get own registration for event',
            description: 'Get your own registration for a given event',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description:
                            'The slug of the event to get your registration for',
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
            errorResponses: [status.NOT_FOUND],
        },
    })
}
