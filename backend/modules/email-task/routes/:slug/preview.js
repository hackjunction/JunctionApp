const status = require('http-status')

const asyncHandler = require('express-async-handler')
const { validate } = require('express-jsonschema')
const { Auth, JsonSchemas } = require('@hackjunction/shared')
const swagger = require('swagger-spec-express')

const { hasToken } = require('../../../../common/middleware/token')
const { hasPermission } = require('../../../../common/middleware/permissions')
const { isEventOrganiser } = require('../../../../common/middleware/events')
const EmailTaskController = require('../../controller')

module.exports = async (fastify, options, next) => {
    fastify.addSchema(JsonSchemas.EmailParameters)

    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: {
                type: 'object',
                required: ['to', 'params'],
                properties: {
                    to: {
                        type: 'string',
                        description: 'The email address to send the preview to',
                        format: 'email',
                    },
                    params: {
                        $ref: JsonSchemas.EmailParameters.$id,
                    },
                },
            },
            response: {
                [status.OK]: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['success', 'error'],
                        },
                        message: {
                            type: 'string',
                            description: 'A description of the error',
                        },
                    },
                },
            },
        },
        async handler(request, reply) {
            const { to, params } = request.body
            await EmailTaskController.sendPreviewEmail(to, params)
            reply.send({ message: 'success' })
        },
    })

    next()
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
