const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const HackerpackController = require('./controller')
const EventController = require('../event/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')

const getHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.getHackerpack(req.user.sub)
    return res.status(200).json(Hackerpack)
})

const getHackerpackByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Hackerpacks = await HackerpackController.getHackerpackByEvent(event)
    return res.status(200).json(Hackerpacks)
})

const createHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.createHackerpack(
        req.body,
        req.user.sub
    )
    return res.status(201).json(Hackerpack)
})

const updateHackerpack = asyncHandler(async (req, res) => {
    const updatedHackerpack = await HackerpackController.updateHackerpack(
        req.body,
        req.user.sub
    )
    return res.status(200).json(updatedHackerpack)
})

// TODO has superadmin
router
    .route('/')
    .get(hasToken, getHackerpack)
    .post(
        hasToken,
        createHackerpack,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT)
    )
    .patch(
        hasToken,
        updateHackerpack,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT)
    )

router.route('/event/:slug').get(getHackerpackByEvent)

module.exports = router
