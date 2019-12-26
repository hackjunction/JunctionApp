const status = require('http-status')

const asyncHandler = require('express-async-handler')
const { validate } = require('express-jsonschema')
const { Auth, JsonSchemas } = require('@hackjunction/shared')
const swagger = require('swagger-spec-express')

const { hasToken } = require('../../../../common/middleware/token')
const { hasPermission } = require('../../../../common/middleware/permissions')
const { isEventOrganiser } = require('../../../../common/middleware/events')
const EmailTaskController = require('../../controller')

swagger.common.addModel({
    name: JsonSchemas.EmailParameters.id,
    type: 'object',
    properties: JsonSchemas.EmailParameters.properties,
})

const bodySchema = {
    type: 'object',
    properties: {
        to: {
            type: 'string',
            description: 'The email address to send the preview to',
            format: 'email',
        },
        params: {
            $ref: JsonSchemas.EmailParameters.id,
        },
    },
    required: ['to', 'params'],
    additionalProperties: false,
}

swagger.common.parameters.addBody(
    {
        name: 'hello',
        description: 'Parameters to be sent in the response body',
        required: true,
        schema: bodySchema,
    },
    {
        deleteNameFromCommon: true,
    }
)

module.exports = (router, path) => {
    router
        .post(
            path,
            validate(
                {
                    body: bodySchema,
                },
                [JsonSchemas.EmailParameters]
            ),
            hasToken,
            hasPermission(Auth.Permissions.MANAGE_EVENT),
            isEventOrganiser,
            asyncHandler(async (req, res) => {
                const { to, params } = req.body
                await EmailTaskController.sendPreviewEmail(to, params)
                return res.status(status.OK).json({ message: 'success' })
            })
        )
        .describe({
            summary: 'Send a preview email',
            description:
                'Send a preview email to a given email address (for testing purposes), before sending it in bulk to actual recipients.',
            common: {
                parameters: {
                    body: ['body'],
                },
            },
            responses: {
                [status.OK]: {
                    description:
                        'Returns a message indicating a successful operation',
                },
            },
        })
}
