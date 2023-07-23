const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const RecruitmentController = require('./controller')
const AuthController = require('../auth/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')


const queryUsers = asyncHandler(async (req, res) => {
    const users = await RecruitmentController.queryProfiles(req.body, req.user)
    return res.status(200).json(users)
})

const getUserProfileRecruitment = asyncHandler(async (req, res) => {
    const userProfile = await RecruitmentController.getRecruitmentProfile(
        req.params.id,
        req.user.sub,
    )
    return res.status(200).json(userProfile)
})

const getRecruiterActions = asyncHandler(async (req, res) => {
    const actionHistory = await RecruitmentController.getRecruiterActions(
        req.user,
    )
    return res.status(200).json(actionHistory)
})

const saveRecruiterAction = asyncHandler(async (req, res) => {
    const actionHistory = await RecruitmentController.saveRecruiterAction(
        req.user,
        req.body,
    )
    return res.status(200).json(actionHistory)
})

router.post(
    '/search',
    hasToken,
    hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
    queryUsers,
)

router
    .route('/profile/:id')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        getUserProfileRecruitment,
    )

router
    .route('/action')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        getRecruiterActions,
    )
    .post(
        hasToken,
        hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
        saveRecruiterAction,
    )

module.exports = router
