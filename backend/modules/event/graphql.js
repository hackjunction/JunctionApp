const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    printSchema,
    buildSchema,
} = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const { SharedGraphQLTypes } = require('@hackjunction/shared/schemas')
const dateUtils = require('../../common/utils/dateUtils')

const SharedSchema = buildSchema(SharedGraphQLTypes)
const { CloudinaryImage } = SharedSchema._typeMap

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        _id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        timezone: {
            type: GraphQLString,
        },
        coverImage: {
            type: CloudinaryImage,
        },
        logo: {
            type: CloudinaryImage,
        },
        eventLocationFormatted: {
            type: GraphQLString,
        },
        eventTimeFormatted: {
            type: GraphQLString,
        },
    }),
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        eventById: {
            type: EventType,
            args: {
                _id: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        events: {
            type: GraphQLList(EventType),
        },
    },
})

const resolvers = {
    Query: {
        eventById: (parent, args, context) => {
            return context.controller('Event').getById(args._id)
        },
        events: (parent, args, context) => {
            return context.controller('Event').getAll()
        },
    },
    Event: {
        eventLocationFormatted: parent => {
            if (parent.eventType === 'physical') {
                return `${parent.eventLocation.city}, ${parent.eventLocation.country}`
            }
            return 'Online'
        },
        eventTimeFormatted: parent => {
            return dateUtils.formatDateInterval(
                parent.startTime,
                parent.endTime
            )
        },
    },
}

const rawSchema = new GraphQLSchema({
    query: QueryType,
})

const stringSchema = printSchema(rawSchema)
const EventSchema = makeExecutableSchema({
    typeDefs: stringSchema,
    resolvers,
})

module.exports = {
    EventSchema,
    EventType,
}
