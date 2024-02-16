const express = require('express')

const router = express.Router()
const _ = require('lodash')
const asyncHandler = require('express-async-handler')

const { hasToken } = require('../../common/middleware/token')
const { hasValidVotingToken } = require('../../common/middleware/votingToken')
const { isEventOrganiser } = require('../../common/middleware/events')

const VotingTokenController = require('./controller')

router
    .route('/event/:slug')
    .get(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const tokens = await VotingTokenController.getAllTokensForEvent(
                req.event._id,
            )
            return res.status(200).json(tokens)
        }),
    )
    .post(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const token = await VotingTokenController.generateToken(
                req.body.name,
                req.event._id,
                req.user.sub,
            )
            return res.status(200).json(token)
        }),
    )

router.route('/event/:slug/results').get(
    hasToken,
    isEventOrganiser,
    asyncHandler(async (req, res) => {
        const result = await VotingTokenController.getVotesByProject(
            req.event._id,
        )
        return res.status(200).json(result)
    }),
)

router
    .route('/event/:event/:token')
    .get(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const token = await VotingTokenController.getToken(req.params.token)
            return res.status(200).json(token)
        }),
    )
    .put(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const token = await VotingTokenController.updateToken(
                req.params.token,
                { name: req.body.name },
            )
            return res.status(200).json(token)
        }),
    )
    .delete(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const token = await VotingTokenController.revokeToken(
                req.params.token,
            )
            return res.status(200).json(token)
        }),
    )

router.route('/vote').post(
    hasValidVotingToken,
    asyncHandler(async (req, res) => {
        const token = await VotingTokenController.voteWithToken(
            req.votingToken._id,
            req.body.projectId,
        )
        return res.status(200).json(token)
    }),
)

router.route('/:votingToken').get(
    hasValidVotingToken,
    asyncHandler(async (req, res) => {
        const token = await VotingTokenController.getTokenPublic(
            req.votingToken._id,
        )
        return res.status(200).json(token)
    }),
)

module.exports = router
