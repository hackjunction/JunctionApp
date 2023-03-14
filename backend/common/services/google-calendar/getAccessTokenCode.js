/* eslint-disable camelcase */
const fs = require('fs')
const { google } = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${__dirname}/token.json`

fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
    if (err) {
        console.log('Error loading client secret file:', err)
        return false
    }

    const credentials = JSON.parse(content)
    const { client_secret, client_id, redirect_uris } = credentials.installed

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
    )

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (true) {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            })
            console.log('Authorize this app by visiting this url:\n\n', authUrl)
            console.log(
                '\ncopy the code from the url bar when done:\nhttp://localhost/?code=<COPY THIS PART>&scope=https://www.googleapis.com/auth/calendar',
            )
            console.log(
                '\nthen run "npm run writeGoogleTokenJson <THE COPIED CODE HERE>" in the backend folder',
            )
        } else {
            console.log('Token.json exists, skipping')
        }
    })
})
