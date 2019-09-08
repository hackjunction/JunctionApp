const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const TeamController = require('./controller');

const { hasToken } = require('../../common/middleware/token');
const { hasRegisteredToEvent } = require('../../common/middleware/events');

const createTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.createTeam(req.event, req.user);
    return res.status(200).json(team);
});

const deleteTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.deleteTeam(req.event, req.user, req.params.code);
    return res.status(200).json(team);
});

const lockTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.lockTeam(req.event, req.user, req.params.code);
    return res.status(200).json(team);
});

const joinTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.joinTeam(req.event, req.user, req.params.code);
    return res.status(200).json(team);
});

const leaveTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.leaveTeam(req.event, req.user);
    return res.status(200).json(team);
});

const removeMemberFromTeam = asyncHandler(async (req, res) => {
    const team = await TeamController.removeMemberFromTeam(req.event, req.user, req.params.userId);
    return res.status(200).json(team);
});

const getTeamForEvent = asyncHandler(async (req, res) => {
    const team = await TeamController.getTeam(req.event, req.user);
    return res.status(200).json(team);
});

router
    .route('/:slug')
    .get(hasToken, hasRegisteredToEvent, getTeamForEvent)
    .post(hasToken, hasRegisteredToEvent, createTeamForEvent);

router
    .route('/:slug/:code')
    .delete(hasToken, hasRegisteredToEvent, deleteTeamForEvent)
    .patch(hasToken, hasRegisteredToEvent, lockTeamForEvent);

router
    .route('/:slug/:code/members')
    .post(hasToken, hasRegisteredToEvent, joinTeamForEvent)
    .delete(hasToken, hasRegisteredToEvent, leaveTeamForEvent);

router.route('/:slug/:code/members/:userId').delete(hasToken, hasRegisteredToEvent, removeMemberFromTeam);

module.exports = router;
