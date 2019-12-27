module.exports = async (fastify, options, next) => {
    fastify.register(require('fastify-auth0-verify'), {
        domain: global.gConfig.AUTH0_DOMAIN,
        audience: true,
        secret: global.gConfig.AUTH0_CLIENT_SECRET,
        complete: false,
    })

    next()
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
