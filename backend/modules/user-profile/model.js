const mongoose = require('mongoose');
const _ = require('lodash');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const publicFieldsPlugin = require('../../common/plugins/publicFields');
const Shared = require('@hackjunction/shared');
const AuthController = require('../auth/controller');
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
    },
    recruiterEvents: {
        type: Array,
        required: false,
        default: [],
        set: function(recruiterEvents) {
            this._previousRecruiterEvents = this.recruiterEvents;
            return recruiterEvents;
        }
    },
    recruiterOrganisation: {
        type: String,
        required: false
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

UserProfileSchema.post('save', function(doc, next) {
    if (this._previousRecruiterEvents.length !== 0 && this.recruiterEvents.length === 0) {
        AuthController.revokeRecruiterPermission(this.userId);
    }
    if (this._previousRecruiterEvents.length === 0 && this.recruiterEvents.length !== 0) {
        AuthController.grantRecruiterPermission(this.userId);
    }
    next();
});

UserProfileSchema.index({
    userId: 1
});

UserProfileSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text'
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
