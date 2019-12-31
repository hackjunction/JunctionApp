module.exports = async fastify => {
    fastify.register(require('fastify-swagger'), {
        routePrefix: '/docs',
        exposeRoute: false,
        swagger: {
            info: {
                title: 'Junction App',
                description: 'API Documentation for the Junction App',
                version: '0.1.0',
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                bearerToken: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    })

    fastify.route({
        method: 'GET',
        url: '/docs/json',
        schema: {
            summary: 'Get Swagger JSON definition',
            tags: ['Miscellaneous'],
        },
        handler: async (request, reply) => {
            return reply.code(200).send(fastify.swagger())
        },
    })
}
