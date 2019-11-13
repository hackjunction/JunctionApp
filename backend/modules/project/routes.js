const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { hasToken } = require('../../common/middleware/token');
const { isBefore, isAfter, canSubmitProject } = require('../../common/middleware/events');

/* Get all projects for an event */
router
    .route('/:slug') //
    .get(
        asyncHandler((req, res) => {
            // TODO: Get all projects for an event
            return res.status(200).json([]);
        })
    );

/* Get, update, delete a user's project for an event */
router
    .route('/:slug/team') //
    .get(
        hasToken,
        canSubmitProject,
        asyncHandler((req, res) => {
            // TODO: Get a user's own (their team's) project for an event
        })
    )
    .post(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler((req, res) => {
            //TODO: Submit a user's own (their team's) project for an event
        })
    )
    .patch(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler((req, res) => {
            //TODO: Update a user's own (their team's) project for an event
        })
    );
