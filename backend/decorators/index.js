const fp = require('fastify-plugin')
/** Various helper functions to decorate the fastify instance with */

module.exports = fp(async fastify => {
    fastify.register(require('./route-helpers'))
    fastify.register(require('./reply'))
})
