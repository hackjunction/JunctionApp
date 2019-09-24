const mongoose = require('mongoose');
const _ = require('lodash');
const { RegistrationStatuses } = require('@hackjunction/shared');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const EmailTaskController = require('../email-task/controller');

const RegistrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: String
    },
    status: {
        type: String,
        enum: RegistrationStatuses.ids,
        default: RegistrationStatuses.asObject.pending.id,
        set: function(status) {
            this._previousStatus = this.status;
            return status;
        }
    },
    assignedTo: {
        type: String
    },
    rating: {
        type: Number
    },
    ratedBy: {
        type: String,
        required: function() {
            return !_.isEmpty(this.rating);
        }
    },
    tags: {
        type: [String],
        default: []
    },
    answers: {
        type: mongoose.Mixed,
        default: {}
    }
});

RegistrationSchema.set('timestamps', true);
RegistrationSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'event', 'user', 'createdAt', 'updatedAt']
});

RegistrationSchema.pre('save', function(next) {
    this._wasNew = this.isNew;
    next();
});

/** Trigger email sending on status changes etc. */
RegistrationSchema.post('save', function(doc, next) {
    const SOFT_ACCEPTED = RegistrationStatuses.asObject.softAccepted.id;
    const ACCEPTED = RegistrationStatuses.asObject.accepted.id;
    const SOFT_REJECTED = RegistrationStatuses.asObject.softRejected.id;
    const REJECTED = RegistrationStatuses.asObject.rejected.id;
    /** If a registration was just created, create an email notification about it */
    if (this._wasNew) {
        EmailTaskController.createRegisteredTask(doc.user, doc.event, true);
    }

    /** If a registration is accepted, create an email notification about it */
    if (this._previousStatus === SOFT_ACCEPTED && this.status === ACCEPTED) {
        EmailTaskController.createAcceptedTask(doc.user, doc.event, true);
    }

    /** If a registration is rejected, create an email notification about it */
    if (this._previousStatus === SOFT_REJECTED && this.status === REJECTED) {
        EmailTaskController.createRejectedTask(doc.user, doc.event, true);
    }

    next();
});

RegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

const Registration = mongoose.model('Registration', RegistrationSchema);
module.exports = Registration;
