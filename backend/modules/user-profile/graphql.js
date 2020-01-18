const { gql } = require('apollo-server-express')
const UserProfileController = require('./graphql-controller')

const typeDefs = gql`
    type UserProfile {
        id: ID!
        userId: ID!
        avatar: String
        firstName: String
        lastName: String
        email: String
    }

    extend type Query {
        userProfileById(userId: ID!): UserProfile
    }
`

const resolvers = {
    Query: {
        userProfileById: async (_, args) => {
            return UserProfileController.getById(args.userId)
        },
    },
}

module.exports = { typeDefs, resolvers }
