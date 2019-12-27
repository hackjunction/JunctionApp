module.exports = async (fastify, options, next) => {
    fastify.register(require('./authentication'))

    next()
}
