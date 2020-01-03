const status = require('http-status')

const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const registrations = await RegistrationController.getUserRegistrations(
                request.user
            )
            return reply.code(status.OK).sendData(registrations)
        },
        schema: {
            summary: 'Get own registrations',
            description: 'Get all of your own registrations',
            tags: ['Registrations'],
            response: {
                [status.OK]: fastify.responseArray(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
        },
    })
}
