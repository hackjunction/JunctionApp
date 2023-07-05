const mongoose = require('mongoose')
const _ = require('lodash')
const Shared = require('@hackjunction/shared')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const publicFieldsPlugin = require('../../common/plugins/publicFields')
const AuthController = require('../auth/controller')

const { RegistrationFields } = Shared

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

/** Build user profile fields based on possible registration questions */
const fields = {}
_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    if (value.copyToUserProfile && value.mongooseSchema) {
        fields[fieldName] = value.mongooseSchema
    }
})

UserProfileSchema.add(fields)

/* // Virtual field to fetch registrations if required
UserProfileSchema.virtual('registrations', {
    ref: 'Registration', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: 'user', // is equal to `foreignField`
  }); */

UserProfileSchema.post('save', (doc, next) => {
    if (_.xor(doc._previousRecruiterEvents, doc.recruiterEvents).length !== 0) {
        if (doc.recruiterEvents.length === 0) {
            AuthController.revokeRecruiterPermission(doc.userId)
        } else {
            AuthController.grantRecruiterPermission(doc.userId)
        }
        AuthController.updateMetadata(doc.userId, {
            recruiterEvents: doc.recruiterEvents,
            recruiterOrganisation: doc.recruiterOrganisation,
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
        'headline',
    ],
})

const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

module.exports = {
    UserProfile,
    UserProfileSchema,
}
