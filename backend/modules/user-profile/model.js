const mongoose = require('mongoose');
const _ = require('lodash');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const publicFieldsPlugin = require('../../common/plugins/publicFields');
const Shared = require('@hackjunction/shared');
const { RegistrationFields } = Shared;

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    }
});

/** Build user profile fields based on possible registration questions */
const fields = {};
_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    if (value.hasOwnProperty('userProfileConfig')) {
        fields[fieldName] = value.userProfileConfig;
    }
});

UserProfileSchema.add(fields);

UserProfileSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'userId']
});

UserProfileSchema.plugin(publicFieldsPlugin, {
    fields: ['userId', 'avatar', 'firstName', 'lastName', 'email']
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = {
    UserProfile,
    UserProfileSchema
};
