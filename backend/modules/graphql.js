const { ApolloServer } = require('apollo-server-express')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')

// const { SharedSchema } = require('@hackjunction/shared/schemas')
const { UserProfileSchema } = require('./user-profile/graphql')
const { RegistrationSchema } = require('./registration/graphql')
const { EventSchema } = require('./event/graphql')

module.exports = app => {
    const schema = mergeSchemas({
        schemas: [UserProfileSchema, RegistrationSchema, EventSchema],
    })

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    })
    server.applyMiddleware({ app })
}
