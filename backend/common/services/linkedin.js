const axios = require('axios')

const CLIENT_ID = '77gyr30dlraeob'
const CLIENT_SECRET = 'jvMviXjTgjluzXN8'

const LinkedInService = {
    getAccessToken: () => {
        return axios
            .post(
                `https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
                {},
                {
                    headers: {
                        Host: 'www.linkedin.com',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(res => {
                console.log('getAccessToken', res)
            })
            .catch(err => {
                console.log('getAccessToken err', err)
            })
    },
}

module.exports = LinkedInService
