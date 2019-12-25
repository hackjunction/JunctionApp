const express = require('express')
const { celebrate, Joi } = require('celebrate')
const status = require('http-status')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')
const { isEventOrganiser } = require('../../common/middleware/events')
const EmailTaskController = require('./controller')

const messageParams = () =>
    Joi.object({
        subject: Joi.string()
            .max(200)
            .required(),
        subtitle: Joi.string()
            .max(200)
            .required(),
        header_image: Joi.string().uri(),
        body: Joi.string(),
        cta_text: Joi.string().max(100),
        cta_link: Joi.string().uri(),
        reply_to: Joi.string().email(),
    })

router
    .route('/:slug/preview')
    /** Send a preview email to a given address */
    .post(
        celebrate({
            body: {
                to: Joi.string().email(),
                params: messageParams().required(),
            },
        }),
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const { to, params } = req.body
            await EmailTaskController.sendPreviewEmail(to, params)
            return res.status(status.OK).json({ message: 'success' })
        })
    )

router.route('/:slug/send').post(
    celebrate({
        body: {
            recipients: Joi.array()
                .items(Joi.string().email())
                .min(1)
                .required(),
            params: messageParams(),
            uniqueId: Joi.string(),
        },
    }),
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    asyncHandler(async (req, res) => {
        const { event } = req
        const { recipients, params, uniqueId } = req.body
        EmailTaskController.sendBulkEmail(recipients, params, event, uniqueId)
        return res.status(status.OK).json({ message: 'success' })
    })
)

module.exports = router
