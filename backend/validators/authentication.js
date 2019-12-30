const _ = require('lodash')
const { UnauthorizedError } = require('../common/errors/errors')

module.exports = async fastify => {
    fastify.register(require('fastify-auth0-verify'), {
        domain: global.gConfig.AUTH0_DOMAIN,
        audience: true,
        secret: global.gConfig.AUTH0_CLIENT_SECRET,
        complete: false,
    })

    fastify.decorate(
        'hasPermissions',
        (requiredPermissions = []) => async (request, reply) => {
            if (!request.user) {
                throw new Error(
                    '`fastify.hasPermission` cannot be called before `fastify.authenticate`'
                )
            }
            const missingPermissions = _.difference(
                requiredPermissions,
                request.user.permissions
            )
            if (missingPermissions.length > 0) {
                throw new UnauthorizedError(
                    `User does not have the following required permission(s): ${missingPermissions.join(
                        ', '
                    )}`
                )
            }
        }
    )

    fastify.decorate('hasAdminToken', async (request, reply) => {
        if (
            !request.query ||
            request.query.token !== global.gConfig.ADMIN_TOKEN
        ) {
            throw new UnauthorizedError('Invalid admin credentials')
        }
    })
}

// const isAuthenticated = jwt({
//     secret: jwkRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://${global.gConfig.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),
//     getToken: function fromHeaderOrQuerystring(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     },
//     //audience: process.env.AUTH0_DOMAIN,
//     issuer: `https://${global.gConfig.AUTH0_DOMAIN}/`,
//     algorithms: ['RS256']
// });
