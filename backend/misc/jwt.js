const _ = require('lodash')
const jwkRsa = require('jwks-rsa')
const ejwt = require('express-jwt')
const jwt = require('jsonwebtoken')

const idTokenNamespace = global.gConfig.ID_TOKEN_NAMESPACE

const jwksClient = jwkRsa({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${global.gConfig.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

/* Verify JWT from client requests */
const verifyToken = ejwt({
    secret: jwkRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${global.gConfig.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            return req.headers.authorization.split(' ')[1]
        }
        if (req.query && req.query.token) {
            return req.query.token
        }
        return null
    },
    // audience: process.env.AUTH0_DOMAIN,
    issuer: `https://${global.gConfig.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
})

/** Parse the namespaced fields in token */
const parseToken = (req, res, next) => {
    if (req.user) {
        req.user = _.reduce(
            req.user,
            (obj, value, key) => {
                if (key.indexOf(idTokenNamespace) !== -1) {
                    obj[key.replace(idTokenNamespace, '')] = value
                } else {
                    obj[key] = value
                }
                return obj
            },
            {},
        )
    }

    next()
}

/**
 * Verify JWT for thw websocket server separately,
 * as it cannot use auth0's express
 *
 * @param token
 * @returns verified jwt
 */
const verifyWsToken = async token => {
    const headerBase64 = token.split('.')[0]
    const header = JSON.parse(
        Buffer.from(headerBase64, 'base64').toString('utf-8'),
    )
    const key = await jwksClient.getSigningKeyAsync(header.kid)
    const publicKey = key.getPublicKey()

    const test = jwt.verify(token, publicKey)

    return test
}

module.exports = {
    verifyWsToken,
    verifyToken,
    parseToken,
}
