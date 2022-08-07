const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const MeetingType = new GraphQLObjectType({
    name: 'Meeting',
    fields: () => {
        return {
            /** Fields from DB model */
            _id: {
                type: GraphQLNonNull(GraphQLID),
            },
            event: {
                type: GraphQLNonNull(GraphQLString),
            },
            attendees: {
                type: GraphQLList(GraphQLString),
            },
            organizerEmail: {
                type: GraphQLString,
            },
            challenge: {
                type: GraphQLNonNull(GraphQLString),
            },
            title: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            startTime: {
                type: GraphQLDate,
            },
            endTime: {
                type: GraphQLDate,
            },
            timeZone: {
                type: GraphQLString,
            },
            googleMeetLink: {
                type: GraphQLString,
            },
        }
    },
})

const MeetingInput = new GraphQLInputObjectType({
    name: 'MeetingInput',
    fields: () => {
        return {
            event: {
                type: GraphQLNonNull(GraphQLString),
            },
            attendees: {
                type: GraphQLList(GraphQLString),
            },
            organizerEmail: {
                type: GraphQLString,
            },
            challenge: {
                type: GraphQLNonNull(GraphQLString),
            },
            title: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            startTime: {
                type: GraphQLDate,
            },
            endTime: {
                type: GraphQLDate,
            },
            timeZone: {
                type: GraphQLString,
            },
            location: {
                type: GraphQLString,
            },
        }
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        meetingSlots: {
            type: GraphQLList(MeetingType),
            args: {
                eventId: {
                    type: GraphQLString,
                },
                challengeId: {
                    type: GraphQLString,
                },
                from: {
                    type: GraphQLDate,
                },
                dayRange: {
                    type: GraphQLInt,
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createMeetingSlot: {
            type: MeetingType,
            args: {
                meeting: { type: GraphQLNonNull(MeetingInput) },
            },
        },
    },
})

const Resolvers = {
    Query: {
        meetingSlots: async (parent, args, context) => {
            if (args.eventId && args.challengeId) {
                return context
                    .controller('Meeting')
                    .getMeetings(
                        args.eventId,
                        args.challengeId,
                        args.from,
                        args.dayRange,
                    )
            }
            return null
        },
    },
    Mutation: {
        createMeetingSlot: async (paren, args, context) => {
            return context.controller('Meeting').create(args.meeting)
        },
    },
}

module.exports = {
    QueryType,
    MutationType,
    Resolvers,
    Types: {
        MeetingType,
    },
}
