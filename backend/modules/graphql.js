const {
    ApolloServer,
    gql,
    makeExecutableSchema,
} = require('apollo-server-express')
const _ = require('lodash')

const registration = require('./registration/graphql')
const userProfile = require('./user-profile/graphql')
const event = require('./event/graphql')

module.exports = app => {
    const Query = gql`
        type Query {
            _empty: String
        }

        type Mutation {
            _empty: String
        }
    `

    const schema = makeExecutableSchema({
        typeDefs: [
            Query,
            registration.typeDefs,
            userProfile.typeDefs,
            event.typeDefs,
        ],
        resolvers: _.merge(
            registration.resolvers,
            userProfile.resolvers,
            event.resolvers
        ),
    })

    const server = new ApolloServer({
        schema,
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    })

    server.applyMiddleware({ app })
}
