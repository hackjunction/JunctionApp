const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const AdController = require('./controller')
const EventController = require('../event/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasRole } = require('../../common/middleware/permissions')

const getFullAd = asyncHandler(async (req, res) => {
    const Ad = await AdController.getFullAd()
    return res.status(200).json(Ad)
})

const getAd = asyncHandler(async (req, res) => {
    const Ad = await AdController.getAdBySlug(req.params.slug)
    return res.status(200).json(Ad)
})

const deleteAd = asyncHandler(async (req, res) => {
    const Ad = await AdController.deleteAd(req.params.slug)
    return res.status(200).json(Ad)
})

// TODO implement event specific Adaa
/*
const getAdByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Ads = await AdController.getAdByEvent(event)
    return res.status(200).json(Ads)
})
*/

const createAd = asyncHandler(async (req, res) => {
    const Ad = await AdController.createAd(req.body)
    return res.status(201).json(Ad)
})

const updateAd = asyncHandler(async (req, res) => {
    const updatedAd = await AdController.updateAd(req.params.slug, req.body)
    return res.status(200).json(updatedAd)
})

router
    .route('/')
    .get(getFullAd)
    .post(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), createAd)

router
    .route('/:slug')
    .get(getAd)
    .delete(hasToken, deleteAd)
    .patch(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), updateAd)
/*
router.route('/event/:slug').get(getAdByEvent)
*/
module.exports = router
