const status = require('http-status')
const { Auth } = require('@hackjunction/shared')

const EmailTaskController = require('../../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'POST',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const { event } = request
            const { recipients, params, uniqueId } = request.body
            EmailTaskController.sendBulkEmail(
                recipients,
                params,
                event,
                uniqueId
            )
            reply.code(status.OK).send()
        },
        schema: {
            summary: 'Send bulk email',
            description: 'Send an email to many recipients',
            tags: ['Email'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description: 'A valid slug for an event',
                    },
                },
                ['slug']
            ),
            body: fastify.requestParams({
                recipients: {
                    type: 'array',
                    description: 'An array of recipients',
                    items: {
                        type: 'string',
                        format: 'email',
                    },
                },
                params: fastify.refs.EmailParameters,
                uniqueId: {
                    type: 'string',
                },
            }),
            response: {
                [status.OK]: fastify.responseEmpty(status.OK),
            },
        },
    })
}
