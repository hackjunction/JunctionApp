const express = require('express')

const router = express.Router()
const _ = require('lodash')
const asyncHandler = require('express-async-handler')

const WinnerVote = require('./model')

const { hasToken } = require('../../common/middleware/token')
const {
    hasRegisteredToEvent,
    isEventOrganiser,
} = require('../../common/middleware/events')

const votingController = require('./controller')
const errorHandler = require('../../common/errors/errorHandler')

const getProjectsWithVotesForEvent = asyncHandler(async (req, res) => {
    try {
        const finalistProjectsWithAllVotes =
            await votingController.getFinalistProjectsWithAllVotes(req.event)
        return res.status(200).json(finalistProjectsWithAllVotes)
    } catch (e) {
        return errorHandler(e, req, res)
    }
})

const getVote = asyncHandler(async (req, res) => {
    const vote = await WinnerVote.findOne({
        event: req.event._id,
        user: req.user.sub,
    })

    return res.status(200).json(vote)
})

const submitVote = asyncHandler(async (req, res) => {
    const eventId = req.event._id
    const userId = req.user.sub
    const projectId = req.body.projectId
    try {
        const result = await votingController.submitVote(
            eventId,
            userId,
            projectId,
        )
        return res.status(200).json(result)
    } catch (e) {
        return errorHandler(e, req, res)
    }
})

router
    .route('/:slug')
    .get(hasToken, hasRegisteredToEvent, getVote)
    .post(hasToken, hasRegisteredToEvent, submitVote)

router
    .route('/:slug/results')
    .get(hasToken, isEventOrganiser, getProjectsWithVotesForEvent)

module.exports = router
