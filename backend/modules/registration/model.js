const mongoose = require('mongoose');
const _ = require('lodash');
const RegistrationStatuses = require('@hackjunction/shared');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');

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
        default: 'pending'
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

RegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

const Registration = mongoose.model('Registration', RegistrationSchema);
module.exports = Registration;
