const express = require('express')
const asyncHandler = require('express-async-handler')
const Promise = require('bluebird')

const { Auth } = require('@hackjunction/shared')
const Registration = require('../registration/model')
const { UserProfile } = require('../user-profile/model')
const UserProfileController = require('../user-profile/controller')
const AuthController = require('../auth/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasRole } = require('../../common/middleware/permissions')

const router = express.Router()

const { NotFoundError } = require('../../common/errors/errors')
const { hasAdminToken } = require('../../common/middleware/admin')

const syncCheckedIn = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({ status: 'checkedIn' })

    Promise.map(
        registrations,
        registration => {
            return UserProfileController.syncRegistration(registration)
        },
        {
            concurrency: 100,
        },
    )

    return res.status(200).json({
        message: 'OK',
        details: `Syncing ${registrations.length} registrations`,
    })
})

const anonymiseUserProfile = asyncHandler(async (req, res) => {
    // GDPR
    /** Anonymise the user's profile */
    console.log('anon', req.params)
    const userProfile = await UserProfile.findOne({ userId: req.params.userId })
    if (!userProfile) {
        throw new NotFoundError(
            `User profile with id ${req.params.userId} not found`,
        )
    }
    Object.keys(userProfile.toJSON()).map(field => {
        switch (field) {
            /** Anonymise the fields which the system expects to always exist */
            case 'firstName': {
                userProfile.firstName = 'Anonymous'
                break
            }
            case 'lastName': {
                userProfile.lastName = 'Hacker'
                break
            }
            case 'email': {
                userProfile.email = 'anonymous.hacker@bighackathon.com'
                break
            }
            case 'userId': {
                userProfile.userId += '_anonymous'
                break
            }
            case '_id':
            case '__v':
            case 'createdAt':
            case 'updatedAt':
            case 'registrations': {
                /** Leave the system/metadata fields alone */
                break
            }
            default: {
                /** Delete the rest of the fields */
                if (Array.isArray(userProfile[field])) {
                    userProfile[field] = []
                } else {
                    userProfile[field] = undefined
                }
            }
        }
    })
    await userProfile.save()

    /** Anonymise all of the user's registrations */
    const registrations = await Registration.find({ user: req.params.userId })

    const anonymisedRegistrations = await Promise.map(
        registrations,
        registration => {
            Object.keys(registration.toJSON()).forEach(field => {
                switch (field) {
                    case 'tags': {
                        registration.tags = []
                        break
                    }
                    case 'answers': {
                        registration.answers = {
                            firstName: 'Anonymous',
                            lastName: 'Hacker',
                            email: 'anonymous.hacker@bighackathon.com',
                        }
                        break
                    }
                    case 'user': {
                        registration.user += '_anonymous'
                        break
                    }
                    default:
                        break
                }
            })

            return registration.save()
        },
    )

    /** Delete the original Auth0 user profile */
    await AuthController.deleteUser(req.params.userId)

    res.status(200).json({
        userProfile,
        registrations: anonymisedRegistrations,
    })
})

router.route('/sync-registrations').get(hasAdminToken, syncCheckedIn)
router
    .route('/anonymise-user/:userId')
    .get(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), anonymiseUserProfile)
// router.route('/sync-user-profiles').get(hasAdminToken, syncUserProfiles);

module.exports = router
