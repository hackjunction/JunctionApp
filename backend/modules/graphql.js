const { ApolloServer } = require('apollo-server-express')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')
const { GraphQLSchema, printSchema } = require('graphql')
// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const Registration = require('./registration/graphql')
const Event = require('./event/graphql')
const UserProfile = require('./user-profile/graphql')
const Organization = require('./organization/graphql')

const buildGetController = require('./graphql-controller-factory')

module.exports = app => {
    const modules = [UserProfile, Registration, Event, Organization]
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
        },
    )
    const schema = mergeSchemas({
        schemas: executableSchemas,
    })
    const server = new ApolloServer({
        schema,
        playground: false,
        introspection: false,
        context: ({ req, res }) => ({
            req,
            res,
            userId: req.user ? req.user.sub : null,
            controller: buildGetController(),
        }),
    })
    server.applyMiddleware({ app })
}
