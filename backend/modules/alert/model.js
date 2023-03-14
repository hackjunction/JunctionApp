const mongoose = require('mongoose')

const AlertSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        required: true,
    },
})

const Alert = mongoose.model('Alert', AlertSchema)

module.exports = {
    Alert,
    AlertSchema,
}
