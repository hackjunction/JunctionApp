const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const BannerController = require('./controller')
const EventController = require('../event/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasRole } = require('../../common/middleware/permissions')

const getAllBanners = asyncHandler(async (req, res) => {
    const Banner = await BannerController.getAllBanners()
    return res.status(200).json(Banner)
})

const getBanner = asyncHandler(async (req, res) => {
    const Banner = await BannerController.getBannerBySlug(req.params.slug)
    return res.status(200).json(Banner)
})

const deleteBanner = asyncHandler(async (req, res) => {
    const Banner = await BannerController.deleteBanner(req.params.slug)
    return res.status(200).json(Banner)
})

// TODO implement event specific Banneraa
/*
const getBannerByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Banners = await BannerController.getBannerByEvent(event)
    return res.status(200).json(Banners)
})
*/

const createBanner = asyncHandler(async (req, res) => {
    const Banner = await BannerController.createBanner(req.body)
    return res.status(201).json(Banner)
})

const updateBanner = asyncHandler(async (req, res) => {
    const updatedBanner = await BannerController.updateBanner(
        req.params.slug,
        req.body,
    )
    return res.status(200).json(updatedBanner)
})

router
    .route('/')
    .get(getAllBanners)
    .post(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), createBanner)

router
    .route('/:slug')
    .get(getBanner)
    .delete(hasToken, deleteBanner)
    .patch(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), updateBanner)
/*
router.route('/event/:slug').get(getBannerByEvent)
*/
module.exports = router
