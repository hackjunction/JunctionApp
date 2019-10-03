const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const UserProfileController = require('./controller');
const { Auth } = require('@hackjunction/shared');

const { hasToken } = require('../../common/middleware/token');
const { hasPermission } = require('../../common/middleware/permissions');

const getUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfileController.getUserProfile(req.user.sub);
    return res.status(200).json(userProfile);
});

const getUserProfilesPublic = asyncHandler(async (req, res) => {
    const userProfiles = await UserProfileController.getUserProfilesPublic(req.query.userIds);
    return res.status(200).json(userProfiles);
});

const createUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfileController.createUserProfile(req.body, req.user.sub);
    return res.status(201).json(userProfile);
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const updatedUserProfile = await UserProfileController.updateUserProfile(req.body, req.user.sub);
    return res.status(200).json(updatedUserProfile);
});

const getUsersByEmail = asyncHandler(async (req, res) => {
    const users = await UserProfileController.getUsersByEmail(req.query.email);
    return res.status(200).json(users);
});

const queryUsers = asyncHandler(async (req, res) => {
    const users = await UserProfileController.queryUsers();
    return res.status(200).json(users);
});

router
    .route('/')
    .get(hasToken, getUserProfile)
    .post(hasToken, createUserProfile)
    .patch(hasToken, updateUserProfile);

router.route('/public').get(getUserProfilesPublic);

router.get('/search', hasToken, getUsersByEmail);

/** Shitty route name but lets think about it later */
router.get('/recruitment/search', hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), queryUsers);

module.exports = router;
