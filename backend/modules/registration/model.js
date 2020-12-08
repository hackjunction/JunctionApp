const mongoose = require('mongoose')
const _ = require('lodash')
const {
    RegistrationStatuses,
    RegistrationTravelGrantStatuses,
} = require('@hackjunction/shared')
const AnswersSchema = require('@hackjunction/shared/schemas/Answers')
const TravelGrantDetailsSchema = require('@hackjunction/shared/schemas/TravelGrantDetails')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const EmailTaskController = require('../email-task/controller')
const UserProfileController = require('../user-profile/controller')

const RegistrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: RegistrationStatuses.asObject.pending.id,
        set(status) {
            this._previousStatus = this.status
            return status
        },
        enum: RegistrationStatuses.ids,
    },
    assignedTo: {
        type: String,
    },
    rating: {
        type: Number,
    },
    ratedBy: {
        type: String,
        required() {
            return !_.isEmpty(this.rating)
        },
    },
    tags: {
        type: [String],
        default: [],
    },
    answers: {
        type: AnswersSchema.mongoose,
        default: {},
    },
    travelGrant: {
        type: Number,
        set(amount) {
            this._previousGrant = this.travelGrant
            return amount
        },
    },
    travelGrantStatus: {
        type: String,
        default: RegistrationTravelGrantStatuses.asObject.not_submitted.id,
        enum: RegistrationTravelGrantStatuses.ids,
    },
    travelGrantDetails: {
        type: TravelGrantDetailsSchema.mongoose,
    },
    travelGrantComment: {
        type: String,
    },
    travelGrantAmount: {
        type: Number,
    },
})

/* Only allow a single registration per event per user */
RegistrationSchema.index(
    {
        event: 1,
        user: 1,
    },
    {
        unique: true,
    },
)

RegistrationSchema.index({
    rating: 1,
    status: 1,
})

RegistrationSchema.index({
    assignedTo: 1,
})

RegistrationSchema.set('timestamps', true)
RegistrationSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'event', 'user', 'createdAt', 'updatedAt'],
})

RegistrationSchema.pre('save', function (next) {
    this._wasNew = this.isNew
    next()
})

/** Trigger email sending on status changes etc. */
RegistrationSchema.post('save', function (doc, next) {
    const INCOMPLETE = RegistrationStatuses.asObject.incomplete.id

    const SOFT_ACCEPTED = RegistrationStatuses.asObject.softAccepted.id
    const ACCEPTED = RegistrationStatuses.asObject.accepted.id
    const SOFT_REJECTED = RegistrationStatuses.asObject.softRejected.id
    const REJECTED = RegistrationStatuses.asObject.rejected.id
    /** If a registration has its status changed, update the user profile */
    if (this._previousStatus !== this.status) {
        UserProfileController.syncRegistration(doc)
        // Used to be incomplete, isn't anymore
        if (this._previousStatus === INCOMPLETE) {
            /** If a registration was just created, create an email notification about it */
            EmailTaskController.createRegisteredTask(doc.user, doc.event, true)
        }
    }

    /** If a registration is accepted, create an email notification about it */
    if (this._previousStatus === SOFT_ACCEPTED && this.status === ACCEPTED) {
        EmailTaskController.createAcceptedTask(doc.user, doc.event, true)
    }

    /** If a registration is rejected, create an email notification about it */
    if (this._previousStatus === SOFT_REJECTED && this.status === REJECTED) {
        EmailTaskController.createRejectedTask(doc.user, doc.event, true)
    }

    if (!this._previousGrant && this.travelGrant === 0) {
        EmailTaskController.createTravelGrantRejectedTask(doc, true)
    }

    if (!this._previousGrant && this.travelGrant > 0) {
        EmailTaskController.createTravelGrantAcceptedTask(doc, true)
    }

    next()
})

RegistrationSchema.index({ event: 1, user: 1 }, { unique: true })

const Registration = mongoose.model('Registration', RegistrationSchema)
module.exports = Registration
