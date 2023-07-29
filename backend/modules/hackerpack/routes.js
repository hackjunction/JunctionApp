const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const HackerpackController = require('./controller')
const EventController = require('../event/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasRole } = require('../../common/middleware/permissions')

const getFullHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.getFullHackerpack()
    return res.status(200).json(Hackerpack)
})

const getHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.getHackerpackBySlug(
        req.params.slug,
    )
    return res.status(200).json(Hackerpack)
})

const deleteHackerpack = asyncHandler(async (req, res) => {
    const Hackerpack = await HackerpackController.deleteHackerpack(
        req.params.slug,
    )
    return res.status(200).json(Hackerpack)
})

// TODO implement event specific Hackerpackaa
/*
const getHackerpackByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Hackerpacks = await HackerpackController.getHackerpackByEvent(event)
    return res.status(200).json(Hackerpacks)
})
*/

const createHackerpack = asyncHandler(async (req, res) => {
    const hackerpack = await HackerpackController.createHackerpack(req.body)
    return res.status(201).json(hackerpack)
})

const updateHackerpack = asyncHandler(async (req, res) => {
    const updatedHackerpack = await HackerpackController.updateHackerpack(
        req.params.slug,
        req.body,
    )
    return res.status(200).json(updatedHackerpack)
})

router
    .route('/')
    .get(getFullHackerpack)
    .post(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), createHackerpack)

router
    .route('/:slug')
    .get(getHackerpack)
    .delete(hasToken, deleteHackerpack)
    .patch(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), updateHackerpack)
/*
router.route('/event/:slug').get(getHackerpackByEvent)
*/
module.exports = router
