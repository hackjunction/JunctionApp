const _ = require('lodash');
const { UserProfile } = require('./model');
const { NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.getUserProfile = userId => {
    return UserProfile.findOne({
        userId
    }).then(userProfile => {
        if (!userProfile) {
            throw new NotFoundError(`UserProfile with id ${userId} does not exist`);
        }
        return userProfile;
    });
};

controller.getUserProfiles = userIds => {
    return UserProfile.find({
        userId: {
            $in: userIds
        }
    });
};

controller.queryProfiles = async (query) => {
    const found = await UserProfile
        .find(query.query).skip(query.pagination.skip).limit(query.pagination.limit);

    const count = await UserProfile
        .find(query.query).countDocuments();
    return { found, count };
};

controller.getUserProfilesPublic = userIds => {
    return controller.getUserProfiles(userIds).then(profiles => {
        return UserProfile.publicFields(profiles);
    });
};

controller.createUserProfile = (data, userId) => {
    const userProfile = new UserProfile({
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar
    });

    return userProfile.save();
};

controller.updateUserProfile = (data, userId, updatedRegistration = {}) => {
    return controller.getUserProfile(userId).then(userProfile => {
        if (updatedRegistration !== null) {
            userProfile.registrations = 
            (userProfile.registrations ? userProfile.registrations : [])
            .map(r => {
                if (r.registration === updatedRegistration.registration) {
                    return updatedRegistration;
                } return r;
            })
            if(userProfile.registrations.length === 0){
                userProfile.registrations.push(updatedRegistration);
            }
            data.registrations = userProfile.registrations;
        }

        return UserProfile.updateAllowed(userProfile, data);
    });
};

controller.getUsersByEmail = email => {
    return UserProfile.find({ email });
};


module.exports = controller;
