const { ApolloServer } = require('@apollo/server')
const {
    ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
// const { makeExecutableSchema } = require('graphql-tools')
const { mergeSchemas, makeExecutableSchema } = require('@graphql-tools/schema')
const { GraphQLSchema, printSchema } = require('graphql')
const { Server: WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const http = require('http')
// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const Registration = require('./registration/graphql')
const Event = require('./event/graphql')
const UserProfile = require('./user-profile/graphql')
const Organization = require('./organization/graphql')
const Meeting = require('./meeting/graphql')
const Message = require('./message/graphql')
const Alert = require('./alert/graphql')
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const express = require('express')
// const Team = require('./team/graphql')

const buildGetController = require('./graphql-controller-factory')
const { verifyWsToken } = require('../misc/jwt')

module.exports = async app => {
    const modules = [
        UserProfile,
        Registration,
        Event,
        Organization,
        Message,
        Alert,
        Meeting,
        // Team,
    ]
    const executableSchemas = modules.map(
        ({ QueryType, MutationType, SubscriptionType, Resolvers }) => {
            const rawSchema = new GraphQLSchema({
                query: QueryType,
                mutation: MutationType,
                subscription: SubscriptionType,
            })
            return makeExecutableSchema({
                typeDefs: printSchema(rawSchema),
                resolvers: Resolvers,
            })
        },
    )
    const schema = mergeSchemas({
        schemas: executableSchemas,
    })

    console.log('Before creating httpServer')

    const httpServer = http.createServer(app)

    console.log('Before creating server')

    const server = new ApolloServer({
        schema,
        playground: false,
        introspection: false,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })
    // console.log(httpServer)
    console.log('Before creating wsServer')

    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/graphql',
    })
    console.log('Before creating serverCleanup')

    const serverCleanup = useServer(
        {
            schema,
            onConnect: async ctx => {
                const verified = await verifyWsToken(
                    ctx.connectionParams.authToken,
                )
                // console.info(`got token ${JSON.stringify(user)}`)
                ctx.tokenData = verified
            },
            context: ctx => {
                if (!ctx.tokenData) {
                    return { user: null }
                }
                return { user: ctx.tokenData }
            },
        },
        wsServer,
    )

    console.log('Before server.start()')

    await server.start()

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: ({ req, res }) => ({
                req,
                res,
                userId: req.user ? req.user.sub : null,
                controller: buildGetController(),
            }),
        }),
    )

    const PORT = process.env.PORT || 2222

    await new Promise(resolve => {
        console.log('httpServer.listen', { port: PORT })
        return httpServer.listen({ port: PORT }, resolve)
    }).catch(err => {
        console.error('httpServer.listen error')
        console.error(err)
    })
    // httpServer.listen(PORT, () => {
    //     console.log('server started on port', PORT)
    // })

    // server.expressMiddleware({ app })
    // return httpServer
}
