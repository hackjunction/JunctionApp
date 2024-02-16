const mongoose = require('mongoose')

const VotingTokenSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    isRevoked: {
        type: Boolean,
        default: false,
    },
    revokedAt: {
        type: Date,
        default: null,
    },
})

VotingTokenSchema.set('timestamps', true)

const VotingToken = mongoose.model('VotingToken', VotingTokenSchema)

module.exports = VotingToken
