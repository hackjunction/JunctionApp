const express = require('express')
const status = require('http-status')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { validate } = require('express-jsonschema')
const { Auth, JsonSchemas } = require('@hackjunction/shared')

const { hasToken } = require('../../../../common/middleware/token')
const { hasPermission } = require('../../../../common/middleware/permissions')
const { isEventOrganiser } = require('../../../../common/middleware/events')
const EmailTaskController = require('../../controller')

module.exports = route =>
    route.post(
        validate({}),
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const { event } = req
            const { recipients, params, uniqueId } = req.body
            EmailTaskController.sendBulkEmail(
                recipients,
                params,
                event,
                uniqueId
            )
            return res.status(status.OK).json({ message: 'success' })
        })
    )
