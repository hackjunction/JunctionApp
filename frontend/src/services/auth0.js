import auth0 from 'auth0-js'
import config from 'constants/config'

const Auth0 = new auth0.WebAuth({
    domain: config.AUTH0_DOMAIN,
    clientID: config.AUTH0_CLIENT_ID,
    redirectUri: `${config.BASE_URL}/callback`,
    responseType: 'token id_token',
    scope: 'openid profile',
})

const Auth0Service = {
    authorize: params => {
        Auth0.authorize({
            ...params,
            redirectUri: `${config.BASE_URL}/callback`,
        })
    },
    // TODO this causes a loop on localhost when the token expires
    logout: () => {
        console.log("logging out")
        Auth0.logout({
            returnTo: `${config.BASE_URL}/logout`,
        })
    },
    checkSession: () => {
        return new Promise((resolve, reject) => {
            Auth0.checkSession({}, (err, authResult) => {
                if (
                    authResult &&
                    authResult.accessToken &&
                    authResult.idToken
                ) {
                    resolve(authResult)
                } else if (err) {
                    reject(err)
                }
            })
        })
    },
    parseHash: () => {
        return new Promise((resolve, reject) => {
            Auth0.parseHash((err, authResult) => {
                if (
                    authResult &&
                    authResult.accessToken &&
                    authResult.idToken
                ) {
                    resolve(authResult)
                } else if (err) {
                    reject(err)
                }
            })
        })
    },
}

export default Auth0Service
