const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'GET',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const registrations = await RegistrationController.getRegistrationsForEvent(
                request.event._id
            )
            return reply.code(status.OK).sendData(registrations)
        },
        schema: {
            summary: 'Get all registrations for event',
            description: 'Returns all registrations for an event',
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
