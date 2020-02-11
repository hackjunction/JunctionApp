const mongoose = require('mongoose')

const WinnerVoteSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    user: {
        type: String,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
})

WinnerVoteSchema.set('timestamps', true)
WinnerVoteSchema.index(
    {
        user: 1,
        event: 1,
    },
    {
        unique: true,
    }
)

const WinnerVote = mongoose.model('WinnerVote', WinnerVoteSchema)

module.exports = WinnerVote
