const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const registrations = await RegistrationController.selfAssignRegistrationsForEvent(
                request.event._id,
                request.user.sub
            )

            return reply.code(status.OK).sendData(registrations)
        },
        schema: {
            summary: 'Assign registrations to self',
            description:
                'Assign a set amount of unassigned registrations to yourself',
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
