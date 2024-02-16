const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    recipients: {
        type: Array,
        required: true,
        default: [],
    },
    sender: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        required: true,
    },
    readAt: {
        type: Date,
        default: null,
    },
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = {
    Message,
    MessageSchema,
}
