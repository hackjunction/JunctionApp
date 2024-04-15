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

const getProjectsWithVotesForEvent = asyncHandler(async (req, res) => {
    const finalistProjectsWithAllVotes =
        await votingController.getFinalistProjectsWithAllVotes(req.event)
    return res.status(200).json(finalistProjectsWithAllVotes)
})

const getVote = asyncHandler(async (req, res) => {
    const vote = await WinnerVote.findOne({
        event: req.event._id,
        user: req.user.sub,
    })

    return res.status(200).json(vote)
})

const submitVote = asyncHandler(async (req, res) => {
    const vote = await WinnerVote.findOne({
        event: req.event._id,
        user: req.user.sub,
    })
    if (vote) {
        vote.project = req.body.projectId
        const result = await vote.save()
        return res.status(200).json(result)
    }
    const newVote = new WinnerVote({
        event: req.event._id,
        user: req.user.sub,
        project: req.body.projectId,
    })
    const result = await newVote.save()
    return res.status(200).json(result)
})

router
    .route('/:slug')
    .get(
        hasToken,
        hasRegisteredToEvent,
        getVote,
        // asyncHandler(async (req, res) => {
        //     const vote = await WinnerVote.findOne({
        //         event: req.event._id,
        //         user: req.user.sub,
        //     })

        //     return res.status(200).json(vote)
        // }),
    )
    .post(
        hasToken,
        hasRegisteredToEvent,
        submitVote,
        // asyncHandler(async (req, res) => {
        //     const vote = await WinnerVote.findOne({
        //         event: req.event._id,
        //         user: req.user.sub,
        //     })
        //     if (vote) {
        //         vote.project = req.body.projectId
        //         const result = await vote.save()
        //         return res.status(200).json(result)
        //     }
        //     const newVote = new WinnerVote({
        //         event: req.event._id,
        //         user: req.user.sub,
        //         project: req.body.projectId,
        //     })
        //     const result = await newVote.save()
        //     return res.status(200).json(result)
        // }),
    )

router.route('/:slug/results').get(
    hasToken,
    isEventOrganiser,
    getProjectsWithVotesForEvent,
    // asyncHandler(async (req, res) => {
    // const votes = await WinnerVote.find({
    //     event: req.event._id,
    // })

    // const grouped = _.groupBy(votes, 'project')
    // console.log('Grouped votes:', grouped)
    // getProjectsWithVotesForEvent(req, res)

    // return res.status(200).json(grouped)
    // }
)
// )

module.exports = router
