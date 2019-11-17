const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { hasToken } = require('../../../common/middleware/token');
const { hasRegisteredToEvent } = require('../../../common/middleware/events');

const GavelAnnotator = require('./Annotator');
const GavelController = require('./controller');

router
    .route('/projects/:id')
    /** Get a gavel project and details by it's ID */
    .get(
        hasToken,
        asyncHandler(async (req, res) => {
            const project = await GavelController.getProject(req.params.id);
            return res.status(200).json(project);
        })
    );

router
    .route('/:slug/annotator')
    /** Get a user's annotator for an event */
    .get(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const annotator = await GavelController.getAnnotator(req.event, req.user.sub);
            return res.status(200).json(annotator);
        })
    )
    /** Create (initialize) an annotator for an event */
    .post(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            try {
                const annotator = await GavelController.initAnnotator(req.event, req.user.sub);
                return res.status(200).json(annotator);
            } catch (err) {
                console.log(err);
                return res.status(200).json(null);
            }
        })
    );

router
    .route('/:slug/skip')
    /** Skip current project as an annotator */
    .post(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const annotator = await GavelAnnotator.findOne({
                user: req.user.sub,
                event: req.event._id
            });

            const result = await annotator.skipCurrentProject();
            return res.status(200).json(result);
        })
    );

router
    .route('/:slug/done')
    /** Set the annotator's first project as seen */
    .post(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const annotator = await GavelAnnotator.findOne({
                user: req.user.sub,
                event: req.event._id
            });

            const result = await annotator.assignNextProject();

            return res.status(200).json(result);
        })
    );

router
    .route('/:slug/vote/:winnerId')
    /** Submit a vote as an annotator */
    .post(
        hasToken,
        hasRegisteredToEvent,
        asyncHandler(async (req, res) => {
            const annotator = await GavelController.submitVote(req.event, req.user.sub, req.params.winnerId);
            return res.status(200).json(annotator);
        })
    );

module.exports = router;
