const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Auth } = require('@hackjunction/shared');

const TravelGrantController = require('./controller');

const { hasToken } = require('../../common/middleware/token');
const { hasPermission } = require('../../common/middleware/permissions');
const { hasRegisteredToEvent, isEventOrganiser } = require('../../common/middleware/events');

const getTravelGrantsForEvent = asyncHandler(async (req, res) => {
    const travelGrants = await TravelGrantController.getTravelGrantsForEvent(req.event._id.toString());
    return res.status(200).json(travelGrants);
});

const getTravelGrantForUser = asyncHandler(async (req, res) => {
    const travelGrant = await TravelGrantController.getTravelGrantForUser(req.user.sub, req.event._id.toString());
    return res.status(200).json(travelGrant);
});

router.route('/:slug').get(hasToken, hasRegisteredToEvent, getTravelGrantForUser);

router
    .route('/:slug/all')
    .get(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, getTravelGrantsForEvent);

// /** Organiser routes */
// router
//     .route('/organiser/:slug')
//     .get(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, getTeamsForEvent);

// /** User-facing routes */
// router
//     .route('/:slug')
//     .get(hasToken, hasRegisteredToEvent, getTeamForEvent)
//     .post(hasToken, hasRegisteredToEvent, createTeamForEvent);

// router
//     .route('/:slug/:code')
//     .delete(hasToken, hasRegisteredToEvent, deleteTeamForEvent)
//     .patch(hasToken, hasRegisteredToEvent, lockTeamForEvent);

// router
//     .route('/:slug/:code/members')
//     .post(hasToken, hasRegisteredToEvent, joinTeamForEvent)
//     .delete(hasToken, hasRegisteredToEvent, leaveTeamForEvent);

// router.route('/:slug/:code/members/:userId').delete(hasToken, hasRegisteredToEvent, removeMemberFromTeam);

module.exports = router;
