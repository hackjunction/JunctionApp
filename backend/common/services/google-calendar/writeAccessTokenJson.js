/* eslint-disable camelcase */
const fs = require('fs')
const { google } = require('googleapis')

const TOKEN_PATH = `${__dirname}/token.json`

const main = () => {
    if (process.argv.length !== 3) {
        console.log(`got ${process.argv.length} arguments, expected 3`)
        return false
    }

    fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
        if (err) {
            console.log('Error loading client secret file:', err)
            return false
        }

        const credentials = JSON.parse(content)
        const { client_secret, client_id, redirect_uris } =
            credentials.installed

        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0],
        )

        const code = process.argv[2]
        console.log('got code', code)
        oAuth2Client.getToken(code, (err, token) => {
            console.log('err:', err)
            console.log('token:', token)
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
                if (error) return console.error(error)
                console.log('Token stored to', TOKEN_PATH)
            })
        })
    })
}
main()
