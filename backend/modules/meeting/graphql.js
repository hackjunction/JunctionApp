const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLInputObjectType,
} = require('graphql')
// const { GraphQLDate } = require('graphql-iso-date')
const { DateResolver } = require('graphql-scalars')

const MeetingType = new GraphQLObjectType({
    name: 'Meeting',
    fields: () => {
        return {
            /** Fields from DB model */
            _id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            event: {
                type: new GraphQLNonNull(GraphQLString),
            },
            attendees: {
                type: new GraphQLList(GraphQLString),
            },
            organizerEmail: {
                type: GraphQLString,
            },
            challenge: {
                type: new GraphQLNonNull(GraphQLString),
            },
            title: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            startTime: {
                type: DateResolver,
            },
            endTime: {
                type: DateResolver,
            },
            timeZone: {
                type: GraphQLString,
            },
            googleMeetLink: {
                type: GraphQLString,
            },
            location: {
                type: GraphQLString,
            },
        }
    },
})

const MeetingMutationDeleteResponseType = new GraphQLObjectType({
    name: 'DeletedResponse',
    fields: () => {
        return {
            acknowledged: { type: GraphQLBoolean },
            deletedCount: { type: GraphQLInt },
        }
    },
})

const MeetingsMutationResponseType = new GraphQLObjectType({
    name: 'MeetingsMutationResponse',
    fields: () => {
        return {
            created: {
                type: new GraphQLList(MeetingType),
            },
            deleted: {
                type: MeetingMutationDeleteResponseType,
            },
        }
    },
})

const MeetingInput = new GraphQLInputObjectType({
    name: 'MeetingInput',
    fields: () => {
        return {
            event: {
                type: new GraphQLNonNull(GraphQLString),
            },
            attendees: {
                type: new GraphQLList(GraphQLString),
            },
            organizerEmail: {
                type: GraphQLString,
            },
            challenge: {
                type: new GraphQLNonNull(GraphQLString),
            },
            title: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            startTime: {
                type: DateResolver,
            },
            endTime: {
                type: DateResolver,
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
            type: new GraphQLList(MeetingType),
            args: {
                eventId: {
                    type: GraphQLString,
                },
                challengeId: {
                    type: GraphQLString,
                },
                recruiterEmail: {
                    type: GraphQLString,
                },
                from: {
                    type: DateResolver,
                },
                to: {
                    type: DateResolver,
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
                meeting: { type: new GraphQLNonNull(MeetingInput) },
            },
        },
        meetingSlotsBulkAction: {
            type: MeetingsMutationResponseType,
            args: {
                create: {
                    type: new GraphQLList(new GraphQLNonNull(MeetingInput)),
                },
                delete: {
                    type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
                },
            },
        },
        bookMeeting: {
            type: MeetingType,
            args: {
                meetingId: { type: new GraphQLNonNull(GraphQLString) },
                attendees: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
                },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
            },
        },
        cancelMeeting: {
            type: MeetingType,
            args: {
                meetingId: { type: new GraphQLNonNull(GraphQLString) },
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
                        args.recruiterEmail,
                        args.from,
                        args.to,
                    )
            }
            return null
        },
    },
    Mutation: {
        createMeetingSlot: async (parent, args, context) => {
            return context.controller('Meeting').create(args.meeting)
        },
        meetingSlotsBulkAction: async (parent, args, context) => {
            const created = await context
                .controller('Meeting')
                .createMany(args.create)
            const deleted = await context
                .controller('Meeting')
                .deleteMany(args.delete)
            return { created, deleted }
        },
        bookMeeting: async (parent, args, context) => {
            if (args.meetingId && args.attendees) {
                console.log('booking meeting...', args)
                return context
                    .controller('Meeting')
                    .bookMeeting(
                        args.meetingId,
                        args.attendees,
                        args.location,
                        args.description,
                    )
            }
            return null
        },
        cancelMeeting: async (parent, args, context) => {
            if (args.meetingId) {
                return context
                    .controller('Meeting')
                    .cancelMeeting(args.meetingId)
            }
            return null
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
