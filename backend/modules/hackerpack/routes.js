const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const HackerpackController = require('./controller')
const EventController = require('../event/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')

const getFullHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.getFullHackerpack()
    return res.status(200).json(Hackerpack)
})

const getHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.getHackerpackBySlug(
        req.params.slug
    )
    return res.status(200).json(Hackerpack)
})

const getHackerpackByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Hackerpacks = await HackerpackController.getHackerpackByEvent(event)
    return res.status(200).json(Hackerpacks)
})

const createHackerpack = asyncHandler(async (req, res) => {
    console.log('creating hackerpak')
    const hackerpack = await HackerpackController.createHackerpack(
        req.body,
        req.user.sub
    )
    console.log('crettod hakeorororo', hackerpack)
    return res.status(201).json(hackerpack)
})

const updateHackerpack = asyncHandler(async (req, res) => {
    console.log('reoutes', req.params.slug, req.body)
    const updatedHackerpack = await HackerpackController.updateHackerpack(
        req.params.slug,
        req.body
    )
    return res.status(200).json(updatedHackerpack)
})

// TODO has superadmin for post patch
router
    .route('/')
    .get(hasToken, getFullHackerpack)
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT),
        createHackerpack
    )

router
    .route('/:slug')
    .get(getHackerpack)
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT),
        updateHackerpack
    )

router.route('/event/:slug').get(getHackerpackByEvent)

module.exports = router
