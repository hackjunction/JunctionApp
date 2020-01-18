const { gql } = require('apollo-server-express')
const RegistrationController = require('./graphql-controller')
const UserProfileController = require('../user-profile/graphql-controller')
const EventController = require('../event/graphql-controller')

const typeDefs = gql`
    type Registration {
        id: ID!
        user: String
        _user: UserProfile!
        event: String
        _event: Event!
        status: String! # TODO: This should be an enum
        assignedTo: ID
        rating: Int
        ratedBy: ID
        tags: [String!]
        # answers: TODO: {Custom object shape}
        travelGrant: Int
        travelGrantStatus: String
        travelGrantDetails: String
        travelGrantComment: String
        travelGrantAmount: Int
    }

    extend type Query {
        registrationById(registrationId: String!): Registration
        registrations: [Registration!]!
        registrationsByEvent(eventId: String!): [Registration!]!
        registrationsByUser(userId: String!): [Registration!]!
    }
`

const resolvers = {
    Query: {
        registrationById: async (_, args) => {
            return RegistrationController.getById(args.registrationId)
        },
        registrations: async () => {
            return RegistrationController.getAll()
        },
        registrationsByEvent: async (_, args) => {
            return RegistrationController.getByEventId(args.eventId)
        },
        registrationsByUser: async (_, args) => {
            return RegistrationController.getByUserId(args.userId)
        },
    },
    Registration: {
        _user: async _ => {
            return UserProfileController.getById(_.user)
        },
        _event: async _ => {
            return EventController.getById(_.event)
        },
    },
}

module.exports = { typeDefs, resolvers }
