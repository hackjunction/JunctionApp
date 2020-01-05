const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            await RegistrationController.bulkEditRegistrations(
                request.event._id,
                request.body.registrationIds,
                request.body.edits
            )
            return reply.code(status.OK).send()
        },
        schema: {
            summary: 'TODO: Bulk edit registrations',
            description: 'Apply a set of edits to a list of registrations',
            tags: ['Registrations'],
            response: {
                [status.OK]: fastify.responseEmpty(status.OK),
            },
        },
    })
}
