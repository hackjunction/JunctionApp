const mongoose = require('mongoose')

const EmailTaskSchema = new mongoose.Schema({
    params: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    schedule: {
        type: Date,
        default: Date.now,
    },
    deliveredAt: {
        type: Date,
        default: null,
    },
    event: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

EmailTaskSchema.set('timestamps', true)
EmailTaskSchema.index(
    {
        event: 1,
        user: 1,
        type: 1,
    },
    {
        unique: true,
    }
)

const EmailTask = mongoose.model('EmailTask', EmailTaskSchema)

module.exports = EmailTask
