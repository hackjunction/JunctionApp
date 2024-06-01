const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const ProjectScoreController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasWebhookToken } = require('../../common/middleware/webhook')
const {
    canSubmitProject,
    isEventOrganiser,
    getEventFromParams,
    hasPartnerToken,
    isEventPartner,
    isOrganiserOrCanSubmitProject,
} = require('../../common/middleware/events')

const addProjectScore = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    try {
        // if (req.params.track) {
        //     req.body.track = req.params.track._id
        // }
        // if (req.params.challenge) {
        //     req.body.challenge = req.params.challenge._id
        // }
        const score = await ProjectScoreController.addProjectScore(
            projectId,
            req.body,
        )
        return res.status(200).json(score)
    } catch (e) {
        return res.status(500).json({
            message:
                'Add project score encountered an unknown error. Please check your request and try again.',
            error: e.message,
        })
    }
})

const updateProjectScore = asyncHandler(async (req, res) => {
    try {
        if (req.params.track) {
            req.body.track = req.params.track._id
        }
        if (req.params.challenge) {
            req.body.challenge = req.params.challenge._id
        }
        const score = await ProjectScoreController.updateProjectScore(
            req.params.id,
            req.body,
        )
        return res.status(200).json(score)
    } catch (e) {
        return res.status(500).json({
            message:
                'Update project score encountered an unknown error. Please check your request and try again.',
            error: e.message,
        })
    }
})

const getScoresByEventAndTeam = asyncHandler(async (req, res) => {
    const scores = await ProjectScoreController.getScoresByEventAndTeamId(
        req.event._id,
        req.team._id,
    )
    return res.status(200).json(scores)
})

const getScoreByProjectId = asyncHandler(async (req, res) => {
    const challenge = req.params.challenge ? req.params.challenge._id : null
    const track = req.params.track ? req.params.track._id : null
    const score = await ProjectScoreController.getScoreByProjectId(
        req.params.projectId,
        challenge,
        track,
    )
    return res.status(200).json(score)
})

const getPublicScores = asyncHandler(async (req, res) => {
    if (!req.event) {
        return res.status(404).json({ message: 'Event not found.' })
    }
    const scores = await ProjectScoreController.getPublicScores(req.event.id)
    return res.status(200).json(scores)
})

const updateProjectScoreWithReviewers = asyncHandler(async (req, res) => {
    const { slug, projectScoreId } = req.params
    try {
        // if (req.params.track) {
        //     req.body.track = req.params.track._id
        // }
        // if (req.params.challenge) {
        //     req.body.challenge = req.params.challenge._id
        // }
        const projectScore =
            await ProjectScoreController.updateProjectScoreWithReviewers(
                projectScoreId,
                req.body,
            )
        return res.status(200).json(projectScore)
    } catch (e) {
        return res.status(500).json({
            message:
                'Update project score encountered an unknown error. Please check your request and try again.',
            error: e.message,
        })
    }
})

router.post('/', hasWebhookToken, addProjectScore)
router.put('/:id', hasWebhookToken, updateProjectScore)
router.get(
    '/personal/:slug',
    hasToken,
    canSubmitProject,
    getScoresByEventAndTeam,
)
router.get('/event/:slug', getEventFromParams, getPublicScores)
router.get(
    '/event/:slug/project/:projectId',
    hasToken,
    isOrganiserOrCanSubmitProject,
    getScoreByProjectId,
)

router.post('/event/:slug', hasToken, isEventOrganiser, addProjectScore)
router.put('/event/:slug/:id', hasToken, isEventOrganiser, updateProjectScore)

/* Partner reviewing routes */
router.get(
    '/event/:slug/project/:projectId/:token',
    getEventFromParams,
    hasPartnerToken,
    getScoreByProjectId,
)

router.post(
    '/event/:slug/:id/:token',
    getEventFromParams,
    hasPartnerToken,
    addProjectScore,
)
router.put(
    '/event/:slug/:id/:token',
    getEventFromParams,
    hasPartnerToken,
    updateProjectScore,
)

// New routes for project review from partner accounts

router.get(
    '/review/event/:slug/:projectId',
    hasToken,
    isEventPartner,
    getScoreByProjectId,
)

router.post(
    '/review/event/:slug/:projectId',
    hasToken,
    isEventPartner,
    addProjectScore,
)

router.put(
    '/review/event/:slug/:projectScoreId',
    hasToken,
    isEventPartner,
    updateProjectScoreWithReviewers,
)

module.exports = router
