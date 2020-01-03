module.exports = async fastify => {
    fastify.register(require('./get-user-registrations'))
}
