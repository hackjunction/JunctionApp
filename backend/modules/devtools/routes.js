const express = require('express');
const router = express.Router();
const Registration = require('../registration/model');
const { UserProfile } = require('../user-profile/model');

router.route('/').get((req, res) => {
    return res.status(200).send('DEVTOOLS HERE');
});

router.route('/anonymize-db').get(async (req, res) => {
    const registrations = await Registration.find({});

    const updates = registrations.map(registration => {
        return {
            updateOne: {
                filter: {
                    _id: registration._id
                },
                update: {
                    $set: {
                        'answers.email':
                            'verneri.heikkila+' +
                            Math.floor(Math.random() * 1000000) +
                            '@gmail.com'
                    }
                }
            }
        };
    });

    await Registration.bulkWrite(updates);

    const userProfiles = await UserProfile.find({});

    const userUpdates = userProfiles.map(userProfile => {
        return {
            updateOne: {
                filter: {
                    _id: userProfile._id
                },
                update: {
                    $set: {
                        email:
                            'verneri.heikkila+' +
                            Math.floor(Math.random() * 1000000) +
                            '@gmail.com'
                    }
                }
            }
        };
    });

    await UserProfile.bulkWrite(userUpdates);

    return res.status(200).send('OK');
});

module.exports = router;
