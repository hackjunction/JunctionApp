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
    },
    registrations: {
        type: Array, 
        required: false,
        default: []
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

/* // Virtual field to fetch registrations if required
UserProfileSchema.virtual('registrations', {
    ref: 'Registration', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: 'user', // is equal to `foreignField`
  }); */

UserProfileSchema.index({
    userId: 1
});

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
