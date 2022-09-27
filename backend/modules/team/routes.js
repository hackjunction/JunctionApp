const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const { Auth } = require('@hackjunction/shared')

const TeamController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')
const {
    hasRegisteredToEvent,
    isEventOrganiser,
    isBefore,
} = require('../../common/middleware/events')

const createTeam = asyncHandler(async (req, res) => {
    let team = await TeamController.createTeam(req.event._id, req.user.sub)
    if (req.query.populate === 'true') {
        team = await TeamController.attachMeta(team)
    }
    return res.status(200).json(team)
})

const deleteTeam = asyncHandler(async (req, res) => {
    const team = await TeamController.deleteTeam(req.event._id, req.user.sub)
    return res.status(200).json(team)
})

const editTeam = asyncHandler(async (req, res) => {
    const team = await TeamController.editTeam(
        req.event._id,
        req.user.sub,
        req.body,
    )
    return res.status(200).json(team)
})

const joinTeam = asyncHandler(async (req, res) => {
    let team = await TeamController.joinTeam(
        req.event._id,
        req.user.sub,
        req.params.code,
    )
    if (req.query.populate === 'true') {
        team = await TeamController.attachMeta(team)
    }
    return res.status(200).json(team)
})

const leaveTeam = asyncHandler(async (req, res) => {
    const team = await TeamController.leaveTeam(req.event._id, req.user.sub)
    return res.status(200).json(team)
})

const removeMember = asyncHandler(async (req, res) => {
    const team = await TeamController.removeMemberFromTeam(
        req.event._id,
        req.user.sub,
        req.params.userId,
    )
    return res.status(200).json(team)
})

const getTeam = asyncHandler(async (req, res) => {
    let team = await TeamController.getTeam(
        req.event._id.toString(),
        req.user.sub,
    )
    if (req.query.populate === 'true') {
        team = await TeamController.attachMeta(team)
    }
    return res.status(200).json(team)
})

const getTeamsForEvent = asyncHandler(async (req, res) => {
    const teams = await TeamController.getTeamsForEvent(req.event._id)
    return res.status(200).json(teams)
})

const exportTeams = asyncHandler(async (req, res) => {
    const teams = await TeamController.exportTeams(req.body.teamIds)
    return res.status(200).json(teams)
})

/** Organiser routes */
router
    .route('/organiser/:slug')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        getTeamsForEvent,
    )

router
    .route('/organiser/:slug/export')
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        exportTeams,
    )

/** User-facing routes */
router
    .route('/:slug')
    .get(hasToken, hasRegisteredToEvent, getTeam)
    .post(
        hasToken,
        hasRegisteredToEvent,
        isBefore.submissionsEndTime,
        createTeam,
    )
    .patch(
        hasToken,
        hasRegisteredToEvent,
        isBefore.submissionsEndTime,
        editTeam,
    )
    .delete(
        hasToken,
        hasRegisteredToEvent,
        isBefore.submissionsEndTime,
        deleteTeam,
    )

router
    .route('/:slug/:code/members')
    .post(hasToken, hasRegisteredToEvent, isBefore.submissionsEndTime, joinTeam)
    .delete(
        hasToken,
        hasRegisteredToEvent,
        isBefore.submissionsEndTime,
        leaveTeam,
    )

router
    .route('/:slug/:code/members/:userId')
    .delete(
        hasToken,
        hasRegisteredToEvent,
        isBefore.submissionsEndTime,
        removeMember,
    )

module.exports = router
