const { UserProfile } = require('./model')
const { NotFoundError } = require('../../common/errors/errors')
const UserProfileHelpers = require('./helpers')

const controller = {}

controller.getUserProfile = userId => {
    return UserProfile.findOne({
        userId,
    }).then(userProfile => {
        if (!userProfile) {
            throw new NotFoundError(
                `UserProfile with id ${userId} does not exist`
            )
        }
        return userProfile
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
    return controller.getUserProfile(registration.user).then(profile => {
        if (profile.registrations.length === 0) {
            profile.registrations = [data]
        } else {
            profile.registrations = profile.toJSON().registrations.map(r => {
                if (r.event.toString() === data.event.toString()) {
                    return data
                }
                return r
            })
        }

        return profile.save()
    })
}

controller.getUsersByEmail = email => {
    return UserProfile.find({ email })
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
