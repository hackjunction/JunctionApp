const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { hasToken } = require('../../../common/middleware/token');

const GavelAnnotator = require('./Annotator');
const GavelController = require('./controller');

router
    .route('/:slug/init')
    /** Begin voting as an annotator. Should fail if the annotator already exists for this event */
    /** TODO: Middleware validation here, */
    .get(
        hasToken,
        asyncHandler(async (req, res) => {
            const annotator = await GavelController.initAnnotator(req.event, req.user.sub);
            return res.status(200).json(annotator);
        })
    );

router
    .route('/:slug/skip')
    /** Skip current project as an annotator */
    .post(
        hasToken,
        asyncHandler(async (req, res) => {
            const annotator = await GavelAnnotator.findOne({
                user: req.user.sub,
                event: req.event._id
            }).skipCurrentProject();
            return res.status(200).json(annotator);
        })
    );

router
    .route('/:slug/done')
    /** Set the annotator's first project as seen */
    .post(
        hasToken,
        asyncHandler(async (req, res) => {
            const annotator = await GavelAnnotator.findOne({
                user: req.user.sub,
                event: req.event._id
            }).assignNextProject();
            return res.status(200).json(annotator);
        })
    );

router
    .route('/:slug/vote/:winnerId')
    /** Submit a vote as an annotator */
    .post(
        hasToken,
        asyncHandler(async (req, res) => {
            const annotator = await GavelController.submitVote(req.event, req.user.sub, req.params.winnerId);
            return res.status(200).json(annotator);
        })
    );
