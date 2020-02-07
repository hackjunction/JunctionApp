const { ApolloServer } = require('apollo-server-express')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')
const { GraphQLSchema, printSchema } = require('graphql')
// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const UserProfile = require('./user-profile/graphql')
const Registration = require('./registration/graphql')
const Event = require('./event/graphql')

const buildGetController = require('./graphql-controller-factory')

module.exports = app => {
    const modules = [UserProfile, Registration, Event]
    const executableSchemas = modules.map(
        ({ QueryType, MutationType, Resolvers }) => {
            const rawSchema = new GraphQLSchema({
                query: QueryType,
                mutation: MutationType,
            })
            return makeExecutableSchema({
                typeDefs: printSchema(rawSchema),
                resolvers: Resolvers,
            })
        }
    )
    const schema = mergeSchemas({
        schemas: executableSchemas,
    })

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({
            req,
            res,
            userId: req.user ? req.user.sub : null,
            controller: buildGetController(),
        }),
    })
    server.applyMiddleware({ app })
}
