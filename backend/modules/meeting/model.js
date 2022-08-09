const mongoose = require('mongoose')

const MeetingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false,
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: false,
    },
    organizerEmail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
    },
    description: {
        type: String,
        maxLength: 5000,
        trim: true,
    },
    location: {
        type: String,
        maxLength: 100,
        trim: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    timeZone: {
        type: String,
        required: true,
        default: 'Europe/Helsinki',
        // enum: ['Europe/Helsinki']
    },
    attendees: {
        type: [String],
        required: true,
    },
    googleEventId: {
        type: String,
        required: false,
    },
    googleMeetLink: {
        type: String,
        required: false,
    },
})

const Meeting = mongoose.model('Meeting', MeetingSchema)

module.exports = Meeting
