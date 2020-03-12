const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const SendgridService = require('../../common/services/sendgrid')

const subscribeToNewsletter = asyncHandler(async (req, res) => {
    await SendgridService.subscribeToMailingList(
        req.body.email,
        req.body.country,
        global.gConfig.SENDGRID_MAILING_LIST_ID
    )
    return res.sendStatus(200)
})

router.route('/').post(subscribeToNewsletter)

module.exports = router
