const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const ProjectController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const {
    isBefore,
    isAfter,
    canSubmitProject,
    isEventOrganiser,
    getEventFromParams,
    isEventPartner,
} = require('../../common/middleware/events')

router.route('/id/:projectId').get(
    asyncHandler(async (req, res) => {
        const project = await ProjectController.getPublicProjectById(
            req.params.projectId,
        )
        return res.status(200).json(project)
    }),
)

router
    .route('/:slug')
    /** Get all projects for an event (limited fields) */
    .get(
        getEventFromParams,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.getProjectPreviewsByEvent(
                req.event._id,
            )
            return res.status(200).json(projects)
        }),
    )

router
    .route('/:slug/partner-review')
    /** Get projects for partner review, only if their status is final, have a team and based on challenges */
    .get(
        hasToken,
        isEventPartner,
        getEventFromParams,
        asyncHandler(async (req, res) => {
            const data = await ProjectController.getDataForPartnerReviewing(
                req.event,
                req.user,
            )
            return res.status(200).json(data)
        }),
    )

router
    .route('/:slug/validate')
    /** Validate project before submission on UI, non-blocking (doesn't prevent saving to db) */
    .post(
        getEventFromParams,
        hasToken,
        asyncHandler(async (req, res) => {
            const isProjectNameTaken =
                await ProjectController.isProjectNameTaken(
                    req.event._id,
                    req.body.data.projectName,
                )
            return res.status(200).json({ isProjectNameTaken })
        }),
    )

router
    .route('/:slug/team')
    /** Get the projects submitted by a user's team at a given event */
    .get(
        hasToken,
        canSubmitProject,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.getProjectsByEventAndTeam(
                req.event._id,
                req.team._id,
            )
            return res.status(200).json(projects)
        }),
    )
    /** Submit a project for a user's team at a given event */
    .post(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler(async (req, res) => {
            const project =
                await ProjectController.createProjectForEventAndTeam(
                    req.event,
                    req.team,
                    req.body.data,
                )
            return res.status(200).json(project)
        }),
    )
    /** Update the project for a user's team at a given event */
    .patch(
        hasToken,
        canSubmitProject,
        isAfter.submissionsStartTime,
        isBefore.submissionsEndTime,
        asyncHandler(async (req, res) => {
            const project =
                await ProjectController.updateProjectForEventAndTeam(
                    req.event,
                    req.team,
                    req.body.data,
                )
            return res.status(200).json(project)
        }),
    )

router
    .route('/:slug/admin')
    /** As an event admin, get all projects for an event */
    .get(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.getAllProjectsByEvent(
                req.event._id,
            )
            return res.status(200).json(projects)
        }),
    )

router
    .route('/:slug/admin/challenge/:challengeSlug/link')
    /** Generate the unique link with which partners can access their projects */
    .get(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const data = await ProjectController.generateChallengeLink(
                req.event,
                req.params.challengeSlug,
            )
            return res.status(200).json(data)
        }),
    )

router
    .route('/:slug/challenge/:token')
    /** Get the projects for a challenge with an admin token */
    .get(
        getEventFromParams,
        asyncHandler(async (req, res) => {
            const projects =
                await ProjectController.getChallengeProjectsWithToken(
                    req.event,
                    req.params.token,
                )
            return res.status(200).json(projects)
        }),
    )

router
    .route('/:slug/admin/track/:trackSlug/link')
    /** Generate the unique link with which partners can access their projects */
    .get(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const data = await ProjectController.generateTrackLink(
                req.event,
                req.params.trackSlug,
            )
            return res.status(200).json(data)
        }),
    )

router
    .route('/:slug/tracks/:token')
    /** Get the projects for a challenge with an admin token */
    .get(
        getEventFromParams,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.getTrackProjectsWithToken(
                req.event,
                req.params.token,
            )
            return res.status(200).json(projects)
        }),
    )

router
    .route('/:slug/token/:token/validate')
    /** check if the token is valid */
    .get(
        getEventFromParams,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.validateToken(
                req.event,
                req.params.token,
            )
            return res.status(200).json(projects)
        }),
    )

router
    .route('/:slug/admin/export')
    /** As an event admin, export selected projects */
    .post(
        hasToken,
        isEventOrganiser,
        asyncHandler(async (req, res) => {
            const projects = await ProjectController.exportProjects(
                req.body.projectIds,
            )
            return res.status(200).json(projects)
        }),
    )

module.exports = router
