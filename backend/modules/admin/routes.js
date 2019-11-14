const express = require('express');
const asyncHandler = require('express-async-handler');
const Promise = require('bluebird');

const Registration = require('../registration/model');
const UserProfileController = require('../user-profile/controller');

const router = express.Router();

const { hasAdminToken } = require('../../common/middleware/admin');

const syncCheckedIn = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({ status: 'checkedIn' });

    Promise.map(
        registrations,
        registration => {
            return UserProfileController.syncRegistration(registration);
        },
        {
            concurrency: 100
        }
    );

    return res.status(200).json({
        message: 'OK',
        details: `Syncing ${registrations.length} registrations`
    });
});

router.route('/sync-registrations').get(hasAdminToken, syncCheckedIn);
//router.route('/sync-user-profiles').get(hasAdminToken, syncUserProfiles);

module.exports = router;
