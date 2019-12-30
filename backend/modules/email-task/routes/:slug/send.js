const express = require('express')
const status = require('http-status')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { validate } = require('express-jsonschema')
const { Auth } = require('@hackjunction/shared')

const { JsonSchemas } = require('@hackjunction/shared')

const { hasToken } = require('../../../../common/middleware/token')
const { hasPermission } = require('../../../../common/middleware/permissions')
const { isEventOrganiser } = require('../../../../common/middleware/events')
const EmailTaskController = require('../../controller')

module.exports = async (fastify, options, next) => {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            summary: 'Send bulk email',
            description: 'Send an email to many recipients',
            tags: ['Email'],
            body: {
                type: 'object',
                required: ['recipients', 'params'],
                properties: {
                    recipients: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'email',
                        },
                    },
                    params: `${JsonSchemas.EmailParameters.$id}#`,
                    uniqueId: {
                        type: 'string',
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
            const { event } = request
            const { recipients, params, uniqueId } = request.body
            EmailTaskController.sendBulkEmail(
                recipients,
                params,
                event,
                uniqueId
            )
            // return res.status(status.OK).json({ message: 'success' })
        },
    })

    next()
}

// module.exports = route =>
//     route.post(
//         validate({}),
//         hasToken,
//         hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser,
//         asyncHandler(async (req, res) => {
//             const { event } = req
//             const { recipients, params, uniqueId } = req.body
//             EmailTaskController.sendBulkEmail(
//                 recipients,
//                 params,
//                 event,
//                 uniqueId
//             )
//             return res.status(status.OK).json({ message: 'success' })
//         })
//     )
