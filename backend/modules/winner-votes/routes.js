const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const WinnerVote = require('./model');

const { hasToken } = require('../../common/middleware/token');
const { hasRegisteredToEvent } = require('../../common/middleware/events');

router
    .route('/:slug')
    .get(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const vote = await WinnerVote.findOne({
                event: req.event._id,
                user: req.user.sub
            });

            return res.status(200).json(vote);
        })
    )
    .post(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const vote = await WinnerVote.findOne({
                event: req.event._id,
                user: req.user.sub
            });

            if (vote) {
                vote.project = req.body.projectId;
                const result = await vote.save();
                return res.status(200).json(result);
            } else {
                const newVote = new WinnerVote({
                    event: req.event._id,
                    user: req.user.sub,
                    project: req.body.projectId
                });
                const result = await newVote.save();
                return res.status(200).json(result);
            }
        })
    );

module.exports = router;
