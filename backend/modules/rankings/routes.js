const express = require('express');
const { Auth } = require('@hackjunction/shared');
const asyncHandler = require('express-async-handler');

const { hasPermission } = require('../../common/middleware/permissions');
const { hasToken } = require('../../common/middleware/token');

const router = express.Router();

router
    .route('/:slug')
    /** Get public results for an event */
    .get(
        asyncHandler(async (req, res) => {
            //TODO: Get public results
        })
    );

router
    .route('/:slug/admin')
    /** Get full results for an event, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Get full results
        })
    );

router
    .route('/:slug/admin/track/:track')
    /** Get results for a track, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Get track results
        })
    )
    /** Update results for a track, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Update overall results
        })
    );

router
    .route('/:slug/admin/challenge/:challenge')
    /** Get results for a challenge, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Get results for a challenge
        })
    )
    /** Update results for a challenge, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Update results for a challenge
        })
    );

router
    .route('/:slug/admin/overall')
    /** Get overall results for an event, as event organiser */
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Get overall results for an event
        })
    )
    /** Update overall results for an event, as event organiser */
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        asyncHandler(async (req, res) => {
            //TODO: Update overall results for an event
        })
    );

module.exports = router;
