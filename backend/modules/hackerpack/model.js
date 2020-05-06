const mongoose = require('mongoose')
const _ = require('lodash')
const Shared = require('@hackjunction/shared')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const publicFieldsPlugin = require('../../common/plugins/publicFields')
const AuthController = require('../auth/controller')

const { RegistrationFields } = Shared

const HackerpackSchema = new mongoose.Schema({
    packId: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
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
    if (value.copyToHackerpack && value.mongooseSchema) {
        fields[fieldName] = value.mongooseSchema
    }
})

HackerpackSchema.add(fields)

HackerpackSchema.post('save', function(doc, next) {
    if (
        _.xor(this._previousRecruiterEvents, this.recruiterEvents).length !== 0
    ) {
        if (this.recruiterEvents.length === 0) {
            AuthController.revokeRecruiterPermission(this.packId)
        } else {
            AuthController.grantRecruiterPermission(this.packId)
        }
        AuthController.updateMetadata(this.packId, {
            recruiterEvents: this.recruiterEvents,
            recruiterOrganisation: this.recruiterOrganisation,
        })
    }
    next()
})

HackerpackSchema.set('timestamps', true)

HackerpackSchema.index({
    packId: 1,
})

HackerpackSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
})

HackerpackSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'packId'],
})

HackerpackSchema.plugin(publicFieldsPlugin, {
    fields: ['packId', 'icon', 'name', 'description'],
})

const Hackerpack = mongoose.model('Hackerpack', HackerpackSchema)

module.exports = {
    Hackerpack,
    HackerpackSchema,
}
