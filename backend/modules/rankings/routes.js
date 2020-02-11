const express = require('express')
const { Auth } = require('@hackjunction/shared')
const asyncHandler = require('express-async-handler')

const { isEventOrganiser } = require('../../common/middleware/events')
const { hasPermission } = require('../../common/middleware/permissions')
const { hasToken } = require('../../common/middleware/token')

const RankingsController = require('./controller')

const router = express.Router()

router
    .route('/:slug')
    /** Get public results for an event */
    .get(
        asyncHandler(async (req, res) => {
            //TODO: Get public results
        })
    )

router
    .route('/:slug/admin')
    /** Get full results for an event, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.getAllResultsForEvent(
                req.event
            )
            return res.status(200).json(rankings)
        })
    )

router
    .route('/:slug/admin/track/:track')
    /** Get results for a track, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.getTrackResults(
                req.event,
                req.params.track
            )
            return res.status(200).json(rankings)
        })
    )
    /** Update results for a track, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.updateTrackResults(
                req.event,
                req.params.track,
                req.body.rankings
            )
            return res.status(200).json(rankings)
        })
    )

router
    .route('/:slug/admin/challenge/:challenge')
    /** Get results for a challenge, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.getChallengeResults(
                req.event,
                req.params.challenge
            )
            return res.status(200).json(rankings)
        })
    )
    /** Update results for a challenge, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.updateChallengeResults(
                req.event,
                req.params.challenge,
                req.body.rankings
            )
            return res.status(200).json(rankings)
        })
    )

router
    .route('/:slug/admin/overall')
    /** Get overall results for an event, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.getOverallResults(
                req.event
            )
            return res.status(200).json(rankings)
        })
    )
    /** Update overall results for an event, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.updateOverallResults(
                req.event,
                req.body.rankings
            )
            return res.status(200).json(rankings)
        })
    )

router
    .route('/:slug/admin/generate-results')
    /** Generate results for an event */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const rankings = await RankingsController.generateAllResults(
                req.event
            )
            return res.status(200).json(rankings)
        })
    )

module.exports = router
