/* eslint-disable camelcase */
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const uuidv4 = require('uuid/v4')
const {
    updateMeetingGoogleInfo,
    cancelMeeting,
} = require('../../../modules/meeting/helpers')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${__dirname}/token.json`

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, callbackParameter = null) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
    )

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log('Error loading google calendar token file')
            return false
        }
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client, callbackParameter)
    })
}

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listEvents(auth) {
//     const calendar = google.calendar({ version: 'v3', auth })
//     calendar.events.list(
//         {
//             calendarId: 'primary',
//             timeMin: new Date().toISOString(),
//             maxResults: 10,
//             singleEvents: true,
//             orderBy: 'startTime',
//         },
//         (err, res) => {
//             if (err) return console.log(`The API returned an error: ${err}`)
//             const events = res.data.items
//             if (events.length) {
//                 console.log('Upcoming 10 events:')
//                 events.map((event, i) => {
//                     const start = event.start.dateTime || event.start.date
//                     console.log(`${start} - ${event.summary}`)
//                 })
//             } else {
//                 console.log('No upcoming events found.')
//             }
//         },
//     )
// }

const insertEvent = (auth, eventInfo) => {
    const calendar = google.calendar({ version: 'v3', auth })
    calendar.events.insert(
        {
            auth,
            calendarId: 'primary',
            resource: eventInfo.googleEvent,
            conferenceDataVersion: 1,
        },
        (err, res) => {
            if (err) {
                console.log(
                    `There was an error contacting the Calendar service: ${err}`,
                )
                // cancelMeeting(eventInfo.meetingId)
            } else {
                updateMeetingGoogleInfo(
                    eventInfo.meetingId,
                    res.data.id,
                    res.data.hangoutLink,
                )
            }
        },
    )
}

const deleteEvent = (auth, eventId) => {
    const calendar = google.calendar({ version: 'v3', auth })
    calendar.events.delete(
        {
            auth,
            calendarId: 'primary',
            eventId,
        },
        (err, res) => {
            if (err) {
                console.log('Error while deleting google event:', err)
            }
        },
    )
}

const deleteGoogleEvent = eventId => {
    // Load client secrets from a local file.
    fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
        if (err) {
            console.log('Error loading client secret file:', err)
            return false
        }
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), deleteEvent, eventId)
        return true
    })
}

const createGoogleEvent = event => {
    const googleEvent = {
        summary: event.title || 'Junction: meeting with challenge partner',
        location: event.location || '',
        description: event.description || '',
        start: event.start,
        end: event.end,
        attendees: event.attendees,
        conferenceData: {
            createRequest: {
                conferenceSolutionKey: {
                    type: 'hangoutsMeet',
                },
                requestId: uuidv4(),
            },
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
    }
    const eventInfo = {
        googleEvent,
        meetingId: event.meetingId,
    }

    // Load client secrets from a local file.
    fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
        if (err) {
            console.log('Error loading client secret file:', err)
            return false
        }
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), insertEvent, eventInfo)
        return true
    })
}

module.exports = { createGoogleEvent, deleteGoogleEvent }
