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

const searchUsers = asyncHandler(async (req, res) => {
    const users = await UserProfileController.searchUsers(req.params.terms);
    return res.status(200).json(users);
});

const getRecruiters = asyncHandler(async (req, res) => {
    const users = await UserProfileController.getRecruiters();
    return res.status(200).json(users);
});

const updateRecruiter = asyncHandler(async (req, res) => {
    const user = await UserProfileController.updateRecruiter(
        req.body.recruiterId,
        req.body.events,
        req.body.organisation
    );
    return res.status(200).json(user);
});

router
    .route('/')
    .get(hasToken, getUserProfile)
    .post(hasToken, createUserProfile)
    .patch(hasToken, updateUserProfile);

router.route('/public').get(getUserProfilesPublic);

router.get('/search/:terms', hasToken, searchUsers);

router
    .get('/recruiters', hasToken, hasPermission(Auth.Permissions.MANAGE_RECRUITMENT), getRecruiters)
    .patch('/recruiters', hasToken, hasPermission(Auth.Permissions.MANAGE_RECRUITMENT), updateRecruiter);

module.exports = router;
