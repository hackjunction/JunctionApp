const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const ReferralController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')
const {
    canRegisterToEvent,
    hasRegisteredToEvent,
    isEventOrganiser,
} = require('../../common/middleware/events')

const getReferralById = asyncHandler(async (req, res) => {
    const referral = await ReferralController.getReferralById(req.regId)
    return res.status(200).json(referral)
})
