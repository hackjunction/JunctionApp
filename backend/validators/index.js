/** Various validation hooks for use in API routes */

module.exports = async (fastify, options, next) => {
    fastify.register(require('./authentication'))
    fastify.register(require('./events'))

    next()
}
