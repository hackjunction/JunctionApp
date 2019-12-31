const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const EmailTaskController = require('../../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'POST',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            const { to, params } = request.body
            await EmailTaskController.sendPreviewEmail(to, params)
            reply.code(status.OK).send()
        },
        schema: {
            summary: 'Send a preview email',
            description:
                'Send a test/preview email to a given address, such as your own.',
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
            body: fastify.requestParams(
                {
                    to: {
                        type: 'string',
                        description: 'The email address to send the preview to',
                        format: 'email',
                    },
                    params: fastify.refs.EmailParameters,
                },
                ['to', 'params']
            ),
            response: {
                [status.OK]: fastify.responseEmpty(status.OK),
            },
        },
    })
}

// module.exports = (router, path) => {
//     router
//         .post(
//             path,
//             hasToken,
//             hasPermission(Auth.Permissions.MANAGE_EVENT),
//             isEventOrganiser,
//             asyncHandler(async (req, res) => {
//                 const { to, params } = req.body
//                 await EmailTaskController.sendPreviewEmail(to, params)
//                 return res.status(status.OK).json({ message: 'success' })
//             })
//         )
// }
