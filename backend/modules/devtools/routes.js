const express = require('express')
const _ = require('lodash')
const {
    hasPermission,
    hasRole,
} = require('../../common/middleware/permissions')
const { hasToken } = require('../../common/middleware/token')
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')

const router = express.Router()
const Registration = require('../registration/model')
const { UserProfile } = require('../user-profile/model')

router.route('/').get(
    hasToken,
    hasRole(Auth.Roles.SUPER_ADMIN),
    asyncHandler(async (req, res) => {
        return res.status(200).send('DEVTOOLS ENABLED')
    }),
)

router.route('/anonymize-db').get(
    hasToken,
    hasRole(Auth.Roles.SUPER_ADMIN),
    asyncHandler(async (req, res) => {
        const registrations = await Registration.find({})
        let anonymizeResults = []
        let errors = []
        const updates = registrations.map(registration => {
            return {
                updateOne: {
                    filter: {
                        _id: registration._id,
                    },
                    update: {
                        $set: {
                            'answers.email': `anon+${Math.floor(
                                Math.random() * 1000000,
                            )}@hackjunction.com`,
                        },
                    },
                },
            }
        })
        await Registration.bulkWrite(updates)
            .then(result => {
                anonymizeResults.push(result)
            })
            .catch(err => {
                errors.push(err)
            })

        const userProfiles = await UserProfile.find({})

        const userUpdates = userProfiles.map(userProfile => {
            return {
                updateOne: {
                    filter: {
                        _id: userProfile._id,
                    },
                    update: {
                        $set: {
                            email: `anon+${Math.floor(
                                Math.random() * 1000000,
                            )}@hackjunction.com`,
                        },
                    },
                },
            }
        })

        await UserProfile.bulkWrite(userUpdates)
            .then(result => {
                anonymizeResults.push(result)
            })
            .catch(err => {
                errors.push(err)
            })

        if (errors.length > 0) {
            return res.status(500).json(errors)
        }
        return res.status(200).json(anonymizeResults)
    }),
)

router.route('/sync-user-profiles').get(
    hasToken,
    hasRole(Auth.Roles.SUPER_ADMIN),
    asyncHandler(async (req, res) => {
        const registrations = await Registration.find({})
        const userProfiles = await UserProfile.find({})

        const updates = []

        userProfiles.forEach(user => {
            const registration = _.find(
                registrations,
                reg => reg.user === user.userId,
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
    }),
)

module.exports = router
