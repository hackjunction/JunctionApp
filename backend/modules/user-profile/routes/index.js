module.exports = async fastify => {
    fastify.register(require('./get-user-profile'))
    fastify.register(require('./create-user-profile'))
    fastify.register(require('./edit-user-profile'))

    fastify.register(require('./get-public-user-profiles'), {
        prefix: '/public',
    })

    fastify.register(require('./search-user-profiles'), {
        prefix: '/search',
    })

    fastify.register(require('./get-recruiters'), {
        prefix: '/recruiters',
    })

    fastify.register(require('./edit-recruiter'), {
        prefix: '/recruiters/:userId',
    })
    // TODO: Add route for revoking recruiter access
}
