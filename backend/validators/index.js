/** Various validation hooks for use in API routes */

module.exports = async fastify => {
    require('./authentication')(fastify)
    require('./events')(fastify)
}
