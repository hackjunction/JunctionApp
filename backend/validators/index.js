const fp = require('fastify-plugin')
/** Various validation hooks for use in API routes */

module.exports = fp(async fastify => {
    fastify.register(require('./authentication'))
    fastify.register(require('./events'))
})
