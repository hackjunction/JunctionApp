const { ApolloServer } = require('apollo-server-express')
const { mergeSchemas } = require('graphql-tools')

// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const { UserProfileSchema } = require('./user-profile/graphql')
const { RegistrationSchema } = require('./registration/graphql')
const { EventSchema } = require('./event/graphql')

const buildGetController = require('./graphql-controller-factory')

module.exports = app => {
    const schema = mergeSchemas({
        schemas: [UserProfileSchema, RegistrationSchema, EventSchema],
    })

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({
            req,
            res,
            controller: buildGetController(),
        }),
    })
    server.applyMiddleware({ app })
}
