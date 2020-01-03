const status = require('http-status')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {},
        schema: {
            summary: 'Get own registrations',
            description: 'Get all of your own registrations',
            tags: ['Registrations'],
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
        },
    })
}
