const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            await RegistrationController.acceptSoftAccepted(request.event._id)
            return reply.code(status.OK).send()
        },
        schema: {
            summary: 'Bulk accept registrations',
            description:
                'Set the status of all `softAccepted` registrations to `accepted`. This will also trigger the sending of email notifications to all newly accepted participants',
            tags: ['Registrations'],
            response: {
                [status.OK]: fastify.responseEmpty(status.OK),
            },
        },
    })
}
