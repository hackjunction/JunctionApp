/* eslint-disable camelcase */
const fs = require('fs')
const { google } = require('googleapis')
const uuidv4 = require('uuid/v4')
const { updateMeetingGoogleInfo } = require('../../../modules/meeting/helpers')

const TOKEN_PATH = `${__dirname}/token.json`
const install = {
        client_id: "977605669153-ab3kq61j6ehj4dn4emta0ouasbegrvhf.apps.googleusercontent.com",//global.gConfig.GOOGLE_CLIENT_ID,
        project_id: "junctionapp-calendar",//global.gConfig.GOOGLE_PROJECT_ID,
        auth_uri:"https://accounts.google.com/o/oauth2/auth", //global.gConfig.GOOGLE_AUTH_URI,
        token_uri:"https://oauth2.googleapis.com/token", //global.gConfig.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs", //global.gConfig.GOOGLE_AUTH_PROVIDER,
        client_secret:"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", //global.gConfig.GOOGLE_CLIENT_SECRET,
        redirect_uris:["http://localhost"], //[ global.gConfig.GOOGLE_REDIRECT]
}
const credentialsJ = {
    installed: install
}

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
    /*fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log('Error loading google calendar token file')
            return false
        }
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client, callbackParameter)
    })*/
    const token = {
        access_token:"ya29.a0Aa4xrXPm_2WvYR1lIgL197y6scNs02LJayRTLFTPZXI4JhdjLbuqvHqdVK2me_PEDtxIf7mBToBUiEM6R0gNHCrhodUkmTYLUOlwj_oXhEazuXvQ9pTtyYWvElEYkNr0K6toEu1YI504wMQWVgfU7ycilsi8aCgYKATASARMSFQEjDvL97hV0nKF-oU2GojngJkmeLw0163", //global.gConfig.GOOGLE_ACCESS_TOKEN,
        refresh_token:"1//0csnFALFtU0yJCgYIARAAGAwSNwF-L9IrT9_uBlsJhNPicoj1hKliF80gFzufjk3sRV3aek0wrvQvKokWJohgNFPMH4RGIJONbds" ,//global.gConfig.GOOGLE_REFRESH_TOKEN,
        scope:"https://www.googleapis.com/auth/calendar", //global.gConfig.GOOGLE_SCOPE,
        token_type:"Bearer", //global.gConfig.GOOGLE_TOKEN_TYPE,
        expiry_date:"1666534185958", //global.gConfig.GOOGLE_EXPIRY_DATE
    }

    oAuth2Client.setCredentials(JSON.parse(JSON.stringify(token)))
    callback(oAuth2Client, callbackParameter)

}

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
    try {
        // Load client secrets from a local file.
        /*fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
            if (err) {
                console.log('Error loading client secret file:', err)
                return false
            }
            // Authorize a client with credentials, then call the Google Calendar API.
            authorize(JSON.parse(content), deleteEvent, eventId)
            return true
        })*/

        authorize(JSON.parse(JSON.stringify(credentialsJ)),deleteEvent,eventId)
        return true

    } catch (err) {
        return false
    }
}

const createGoogleEvent = event => {
    try {
        const googleEvent = {
            summary: event.title + " ||  " + event.desc || 'Junction: meeting with challenge partner',
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
        /*fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
            if (err) {
                console.log('Error loading client secret file:', err)
                return false
            }
            // Authorize a client with credentials, then call the Google Calendar API.
            authorize(JSON.parse(content), insertEvent, eventInfo)
            return true
        
        })*/

        console.log(credentialsJ)
        authorize(JSON.parse(JSON.stringify(credentialsJ)),insertEvent,eventInfo)
        return true
    } catch (err) {
        return false
    }
}

module.exports = { createGoogleEvent, deleteGoogleEvent }
