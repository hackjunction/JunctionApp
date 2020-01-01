/** Various helper functions to decorate the fastify instance with */

module.exports = async fastify => {
    require('./route-helpers')(fastify)
    require('./reply')(fastify)
}
