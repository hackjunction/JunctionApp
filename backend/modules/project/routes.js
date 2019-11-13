const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const ProjectController = require('./controller');

const { hasToken } = require('../../common/middleware/token');
const { isBefore, isAfter, canSubmitProject } = require('../../common/middleware/events');

router
    .route('/:slug')
    /** Get all projects for an event */
    .get(
        asyncHandler(async (req, res) => {
            // TODO: Get all projects for an event
            const projects = await new Promise(resolve => resolve([]));
            return res.status(200).json(projects);
        })
    );

router
    .route('/:slug/team')
    /** Get the project submitted by a user's team at a given event */
    .get(
        hasToken,
        canSubmitProject,
        asyncHandler(async (req, res) => {
            const project = await ProjectController.getProjectByEventAndTeam(req.event._id, req.team._id);
            return res.status(200).json(project);
        })
    )
    /** Submit a project for a user's team at a given event */
    .post(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler(async (req, res) => {
            const project = await ProjectController.createProjectForEventAndTeam(req.event, req.team, req.body.data);
            return res.status(200).json(project);
        })
    )
    /** Update the project for a user's team at a given event */
    .patch(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler(async (req, res) => {
            const project = await ProjectController.updateProjectForEventAndTeam(req.event, req.team, req.body.data);
            return res.status(200).json(project);
        })
    );

module.exports = router;
