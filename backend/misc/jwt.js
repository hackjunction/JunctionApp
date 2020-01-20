const _ = require('lodash')
const jwkRsa = require('jwks-rsa')
const jwt = require('express-jwt')

const idTokenNamespace = global.gConfig.ID_TOKEN_NAMESPACE

/* Verify JWT from client requests */
const verifyToken = jwt({
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
            {}
        )
    }

    next()
}

module.exports = {
    verifyToken,
    parseToken,
}
