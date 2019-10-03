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

controller.updateUserProfile = (data, userId) => {
    return controller.getUserProfile(userId).then(userProfile => {
        return UserProfile.updateAllowed(userProfile, data);
    });
};

controller.getUsersByEmail = email => {
    return UserProfile.find({ email });
};

controller.queryUsers = () => {
    return UserProfile.find({}).then(users => {
        return _.shuffle(users).slice(0, 10);
    });
};

module.exports = controller;
