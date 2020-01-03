const mongoose = require('mongoose')
const _ = require('lodash')
const Shared = require('@hackjunction/shared')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const publicFieldsPlugin = require('../../common/plugins/publicFields')
const AuthController = require('../auth/controller')

const { RegistrationFieldsNew } = Shared

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    registrations: {
        type: Array,
        required: false,
        default: [],
    },
    recruiterEvents: {
        type: Array,
        required: false,
        default: [],
        set(recruiterEvents) {
            this._previousRecruiterEvents = this.recruiterEvents
            return recruiterEvents
        },
    },
    recruiterOrganisation: {
        type: String,
        required: false,
    },
})

/** Add additional fields based on possible registration questions */
_.forOwn(RegistrationFieldsNew.Fields, (value, fieldName) => {
    if (
        value.config &&
        value.config.userProfile &&
        value.config.userProfile.field
    ) {
        UserProfileSchema.add({
            [value.config.userProfile.field]: value.config.userProfile.schema,
        })
    }
})

/* // Virtual field to fetch registrations if required
UserProfileSchema.virtual('registrations', {
    ref: 'Registration', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: 'user', // is equal to `foreignField`
  }); */

UserProfileSchema.post('save', function(doc, next) {
    if (
        _.xor(this._previousRecruiterEvents, this.recruiterEvents).length !== 0
    ) {
        if (this.recruiterEvents.length === 0) {
            AuthController.revokeRecruiterPermission(this.userId)
        } else {
            AuthController.grantRecruiterPermission(this.userId)
        }
        AuthController.updateMetadata(this.userId, {
            recruiterEvents: this.recruiterEvents,
            recruiterOrganisation: this.recruiterOrganisation,
        })
    }
    next()
})

UserProfileSchema.set('timestamps', true)

UserProfileSchema.index({
    userId: 1,
})

UserProfileSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
})

UserProfileSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'userId'],
})

UserProfileSchema.plugin(publicFieldsPlugin, {
    fields: [
        'userId',
        'avatar',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
    ],
})

const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

module.exports = {
    UserProfile,
    UserProfileSchema,
}
