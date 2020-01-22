const { ApolloServer } = require('apollo-server-express')
const { mergeSchemas } = require('graphql-tools')

const { UserProfileSchema } = require('./user-profile/graphql')
const { RegistrationSchema } = require('./registration/graphql')

module.exports = app => {
    const schema = mergeSchemas({
        schemas: [UserProfileSchema, RegistrationSchema],
    })

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    })
    server.applyMiddleware({ app })
}
