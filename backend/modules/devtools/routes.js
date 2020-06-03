const express = require('express')
const _ = require('lodash')

const router = express.Router()
const Registration = require('../registration/model')
const { UserProfile } = require('../user-profile/model')
const DiscordService = require('../../common/services/discord')

router.route('/').get((req, res) => {
    return res.status(200).send('DEVTOOLS HERE')
})

router.route('/anonymize-db').get(async (req, res) => {
    const registrations = await Registration.find({})

    const updates = registrations.map(registration => {
        return {
            updateOne: {
                filter: {
                    _id: registration._id,
                },
                update: {
                    $set: {
                        'answers.email': `juuso.lappalainen+${Math.floor(
                            Math.random() * 1000000
                        )}@hackjunction.com`,
                    },
                },
            },
        }
    })

    await Registration.bulkWrite(updates)

    const userProfiles = await UserProfile.find({})

    const userUpdates = userProfiles.map(userProfile => {
        return {
            updateOne: {
                filter: {
                    _id: userProfile._id,
                },
                update: {
                    $set: {
                        email: `juuso.lappalainen+${Math.floor(
                            Math.random() * 1000000
                        )}@hackjunction.com`,
                    },
                },
            },
        }
    })

    await UserProfile.bulkWrite(userUpdates)

    return res.status(200).send('OK')
})

// This isn't in use at the moment
router.route('/test-discord').get(async (req, res) => {
    await DiscordService.initialize()
    res.status(200).send('Initialized')
})

router.route('/sync-user-profiles').get(async (req, res) => {
    const registrations = await Registration.find({})
    const userProfiles = await UserProfile.find({})

    const updates = []

    userProfiles.forEach(user => {
        const registration = _.find(
            registrations,
            reg => reg.user === user.userId
        )

        if (registration && registration.answers) {
            updates.push({
                updateOne: {
                    filter: {
                        userId: user.userId,
                    },
                    update: {
                        $set: {
                            roles: registration.answers.roles,
                            skills: registration.answers.skills,
                            recruitmentOptions:
                                registration.answers.recruitmentOptions,
                        },
                        $addToSet: {
                            registrations: {
                                registration: registration._id,
                                status: registration.status,
                                event: registration.event,
                            },
                        },
                    },
                },
            })
        }
    })

    return UserProfile.bulkWrite(updates)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
})

module.exports = router
