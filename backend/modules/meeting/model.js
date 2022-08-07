const mongoose = require('mongoose')

/*
 summary: event.title || 'Junction: meeting with challenge partner',
        location: event.location || '',
        description: event.description || '',
        start: {
            dateTime: '2022-07-30T15:00:00+03:00',
            timeZone: 'Europe/Helsinki',
        },
        end: {
            dateTime: '2022-07-30T17:00:00+03:00',
            timeZone: 'Europe/Helsinki',
        },
        attendees: event.attendees.map(attendee => ({
            email: attendee.email || '',
            organizer: attendee.isOrganizer || false,
            responseStatus: 'needsAction',
        })),
        // attendees: [
        //     // { email: 'ruukku.cadus@gmail.com' },
        //     {
        //         email: 'oskar.sandas@gmail.com',
        //         responseStatus: 'needsAction',
        //         organizer: false,
        //     },
        //     {
        //         email: 'oskar.sandas1@gmail.com',
        //         responseStatus: 'needsAction',
        //         organizer: true,
        //     },
        // ],
*/

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
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false,
            },
        ],
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
