const express = require('express');
const asyncHandler = require('express-async-handler');
const _ = require('lodash');

const Registration = require('../registration/model');
const { UserProfile } = require('../user-profile/model');

const router = express.Router();

const { hasAdminToken } = require('../../common/middleware/admin');

const syncUserProfiles = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({});
    const userProfiles = await UserProfile.find({});

    const updates = [];

    userProfiles.forEach(user => {
        const registration = _.find(registrations, reg => reg.user === user.userId);

        if (registration && registration.answers) {
            updates.push({
                updateOne: {
                    filter: {
                        userId: user.userId
                    },
                    update: {
                        $set: {
                            roles: registration.answers.roles,
                            skills: registration.answers.skills,
                            recruitmentOptions: registration.answers.recruitmentOptions
                        },
                        $addToSet: {
                            registrations: {
                                registration: registration._id,
                                status: registration.status,
                                event: registration.event
                            }
                        }
                    }
                }
            });
        }
    });

    return UserProfile.bulkWrite(updates)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

router.route('/sync-user-profiles').get(hasAdminToken, syncUserProfiles);

module.exports = router;
