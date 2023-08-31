const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const UserProfileController = require('./controller')
const TeamController = require('../team/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')

const getUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfileController.getUserProfile(req.user.sub)
    return res.status(200).json(userProfile)
})

const getUserPublicProfileById = asyncHandler(async (req, res) => {
    const userProfile = await UserProfileController.getUserPublicProfileById(
        req.params.userId,
    )
    console.log('From routes:', userProfile)
    return res.status(200).json(userProfile)
})

const getUserProfilesPublic = asyncHandler(async (req, res) => {
    const userProfiles = await UserProfileController.getUserProfilesPublic(
        req.query.userIds,
    )
    return res.status(200).json(userProfiles)
})

const getUserProfilesByTeamPublic = asyncHandler(async (req, res) => {
    const teamMembers = await TeamController.getTeamMembers(req.params.teamId)
    const userProfiles = await UserProfileController.getUserProfilesPublic(
        teamMembers,
    )
    return res.status(200).json(userProfiles)
})

// Maybe trim down the data sent to the frontend
const getUserProfilesByTeamId = asyncHandler(async (req, res) => {
    const teamMembers = await TeamController.getTeamMembers(req.params.teamId)
    const userProfiles = await UserProfileController.getUserProfiles(
        teamMembers,
    )
    return res.status(200).json(userProfiles)
})

const createUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfileController.createUserProfile(
        req.body,
        req.user.sub,
    )
    return res.status(201).json(userProfile)
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const updatedUserProfile = await UserProfileController.updateUserProfile(
        req.body,
        req.user.sub,
    )
    return res.status(200).json(updatedUserProfile)
})

const searchUsers = asyncHandler(async (req, res) => {
    const users = await UserProfileController.searchUsers(req.params.terms)
    return res.status(200).json(users)
})

const getRecruiters = asyncHandler(async (req, res) => {
    const users = await UserProfileController.getRecruiters()
    return res.status(200).json(users)
})

const updateRecruiter = asyncHandler(async (req, res) => {
    const user = await UserProfileController.updateRecruiter(
        req.body.recruiterId,
        req.body.events,
        req.body.organisation,
    )
    return res.status(200).json(user)
})

router
    .route('/')
    .get(hasToken, getUserProfile)
    .post(hasToken, createUserProfile)
    .patch(hasToken, updateUserProfile)

router.route('/:userId').get(hasToken, getUserPublicProfileById)

router.route('/public').get(getUserProfilesPublic)
router.route('/public/team/:teamId').get(getUserProfilesByTeamPublic)

router.get(
    '/team/:teamId',
    hasToken,
    hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
    getUserProfilesByTeamId,
)

router.get('/search/:terms', hasToken, searchUsers)

router
    .get(
        '/recruiters',
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT),
        getRecruiters,
    )
    .patch(
        '/recruiters',
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_RECRUITMENT),
        updateRecruiter,
    )

module.exports = router
