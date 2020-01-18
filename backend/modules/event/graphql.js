const { gql } = require('apollo-server-express')
const EventController = require('./graphql-controller')

const typeDefs = gql`
    type Event {
        id: ID!
        name: String
        description: String
        timezone: String
    }

    extend type Query {
        eventById(eventId: ID!): Event
        events: [Event!]!
    }
`

const resolvers = {
    Query: {
        eventById: async (_, args) => {
            return EventController.getById(args.eventId)
        },
        events: async () => {
            return EventController.getAll()
        },
    },
}

module.exports = { typeDefs, resolvers }
