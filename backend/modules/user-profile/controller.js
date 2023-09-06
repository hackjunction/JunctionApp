const { UserProfile } = require('./model')
const { NotFoundError } = require('../../common/errors/errors')
const UserProfileHelpers = require('./helpers')
const userProfileUtils = require('../../common/utils/userProfileUtils')

const controller = {}

controller.getUserProfile = userId => {
    return UserProfile.findOne({
        userId,
    }).then(userProfile => {
        if (!userProfile) {
            throw new NotFoundError(
                `UserProfile with id ${userId} does not exist`,
            )
        }
        return userProfile
    })
}

controller.getUserPublicProfileById = userId => {
    return UserProfile.findOne({
        userId,
    }).then(userProfile => {
        if (!userProfile) {
            throw new NotFoundError(
                `UserProfile with id ${userId} does not exist`,
            )
        }
        return userProfileUtils.publicProfileBuilder(userProfile)
    })
}

controller.getUserProfiles = userIds => {
    return UserProfile.find({
        userId: {
            $in: userIds,
        },
    })
}

controller.queryProfiles = async query => {
    const found = await UserProfile.find(query.query)
        .sort('updatedAt')
        .skip(query.pagination.skip)
        .limit(query.pagination.limit)

    const count = await UserProfile.find(query.query).countDocuments()
    return { found, count }
}

controller.getUserProfilesPublic = userIds => {
    return controller.getUserProfiles(userIds).then(profiles => {
        return UserProfile.publicFields(profiles)
    })
}

controller.createUserProfile = (data, userId) => {
    const userProfile = new UserProfile({
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar,
    })

    return userProfile.save()
}

controller.updateUserProfile = async (data, userId) => {
    const validatedData = await UserProfileHelpers.validate(data)
    return controller.getUserProfile(userId).then(userProfile => {
        return UserProfile.updateAllowed(userProfile, validatedData)
    })
}

controller.syncRegistration = async registration => {
    const data = {
        registration: registration._id,
        event: registration.event,
        status: registration.status,
    }
    return controller.getUserProfile(registration.user).then(async profile => {
        if (profile.registrations.length === 0) {
            profile.registrations = [data]
        } else {
            let add = true
            const registrations = profile.toJSON().registrations.map(r => {
                if (!r.event) {
                    console.log('No Event in R', profile)
                }
                if (!data.event) {
                    console.log('No Event in data', r)
                }
                if (r.event.toString() === data.event.toString()) {
                    add = false
                    return data
                }
                return r
            })
            if (add) {
                registrations.push(data)
            }
            profile.registrations = registrations
        }
        try {
            const ret = await profile.save()
            return ret
        } catch (error) {
            console.log(
                'Error with users registration to event',
                registration.user,
                registration.event,
            )
            console.error(error)
        }
    })
}

controller.getUsersByEmail = email => {
    return UserProfile.find({ email })
}

// a function to get the user id by email
controller.getUserIdByEmail = async (email) => {
    const profiles = await controller.getUsersByEmail(email)
    if (profiles.length === 0) {
        throw new NotFoundError(`User profile with email ${email} does not exist`)
    }
    return profiles[0].userId
}

controller.searchUsers = terms => {
    return UserProfile.find({ $text: { $search: terms } }).limit(25)
}

controller.getRecruiters = () => {
    return UserProfile.find({
        $nor: [
            { recruiterEvents: { $exists: false } },
            { recruiterEvents: { $size: 0 } },
        ],
    })
}

controller.updateRecruiter = (userId, events, organisation) => {
    return UserProfile.findOne({ userId }).then(user => {
        user.recruiterEvents = events
        user.recruiterOrganisation = organisation
        return user.save()
    })
}

module.exports = controller
