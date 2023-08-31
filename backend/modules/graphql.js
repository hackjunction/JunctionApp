const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')
const { GraphQLSchema, printSchema } = require('graphql')
const { Server: WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { createServer } = require('http')
// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const Registration = require('./registration/graphql')
const Event = require('./event/graphql')
const UserProfile = require('./user-profile/graphql')
const Organization = require('./organization/graphql')
const Meeting = require('./meeting/graphql')
const Message = require('./message/graphql')
const Alert = require('./alert/graphql')
// const Team = require('./team/graphql')

const buildGetController = require('./graphql-controller-factory')
const { verifyWsToken } = require('../misc/jwt')

module.exports = app => {
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

    const httpServer = createServer(app)

    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/graphql',
    })
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

    const server = new ApolloServer({
        schema,
        playground: false,
        // TODO make instrospection false in production
        introspection: true,
        context: ({ req, res }) => ({
            req,
            res,
            userId: req.user ? req.user.sub : null,
            controller: buildGetController(),
        }),
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

    server.applyMiddleware({ app })
    return httpServer
}
