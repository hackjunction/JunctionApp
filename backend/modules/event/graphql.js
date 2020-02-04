const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const moment = require('moment-timezone')
const { EventHelpers } = require('@hackjunction/shared')
const dateUtils = require('../../common/utils/dateUtils')

const {
    CloudinaryImage,
    Address,
    Track,
    Challenge,
    TravelGrantConfig,
    RegistrationSection,
    EventTag,
    RegistrationConfig,
} = require('../graphql-shared-types')

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => {
        const { RegistrationType } = require('../registration/graphql').Types //eslint-disable-line
        return {
            /** Fields from DB Model */
            _id: {
                type: GraphQLID,
            },
            name: {
                type: GraphQLString,
            },
            slug: {
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
            eventType: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            /** Times */
            registrationStartTime: {
                type: GraphQLDateTime,
            },
            registrationEndTime: {
                type: GraphQLDateTime,
            },
            startTime: {
                type: GraphQLDateTime,
            },
            endTime: {
                type: GraphQLDateTime,
            },
            submissionsStartTime: {
                type: GraphQLDateTime,
            },
            submissionsEndTime: {
                type: GraphQLDateTime,
            },
            reviewingStartTime: {
                type: GraphQLDateTime,
            },
            reviewingEndTime: {
                type: GraphQLDateTime,
            },
            eventLocation: {
                type: Address,
            },
            tracksEnabled: {
                type: GraphQLBoolean,
            },
            tracks: {
                type: GraphQLList(Track),
            },
            challengesEnabled: {
                type: GraphQLBoolean,
            },
            challenges: {
                type: GraphQLList(Challenge),
            },
            travelGrantConfig: {
                type: TravelGrantConfig,
            },
            reviewMethod: {
                type: GraphQLString,
            },
            overallReviewMethod: {
                type: GraphQLString,
            },
            customQuestions: {
                type: GraphQLList(RegistrationSection),
            },
            tags: {
                type: EventTag,
            },
            /** System metadata */
            published: {
                type: GraphQLBoolean,
            },
            galleryOpen: {
                type: GraphQLBoolean,
            },
            owner: {
                type: GraphQLNonNull(GraphQLString),
            },
            organisers: {
                type: GraphQLList(GraphQLString),
            },
            registrationConfig: {
                type: RegistrationConfig,
            },
            // TODO: Figure this stuff out
            // winners: {
            //     type: mongoose.Mixed,
            //     default: {},
            // },

            /** Custom fields */
            _eventLocationFormatted: {
                type: GraphQLString,
            },
            _eventTimeFormatted: {
                type: GraphQLString,
            },
            _eventStatus: {
                type: GraphQLString,
            },
            _myRegistration: {
                type: RegistrationType,
            },
        }
    },
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
        eventBySlug: {
            type: EventType,
            args: {
                slug: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
        },
        events: {
            type: GraphQLList(EventType),
        },
        myEvents: {
            type: GraphQLList(EventType),
        },
        highlightedEvents: {
            type: GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
        activeEvents: {
            type: GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
        pastEvents: {
            type: GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
    },
})

const Resolvers = {
    Query: {
        myEvents: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null
            return context.controller('Event').getByOrganiser(userId)
        },
        eventById: async (parent, args, context) => {
            return context.controller('Event').getById(args._id)
        },
        eventBySlug: async (parent, args, context) => {
            return context.controller('Event').getBySlug(args.slug)
        },
        events: (parent, args, context) => {
            return context.controller('Event').getAll()
        },
        highlightedEvents: async (parent, args, context) => {
            let events = await context.controller('Event').getHighlighted()

            if (args.limit) {
                events = events.slice(0, args.limit)
            }
            return events
        },
        activeEvents: async (parent, args, context) => {
            let events = await context.controller('Event').getActive()
            if (args.limit) {
                events = events.slice(0, args.limit)
            }
            return events
        },
        pastEvents: async (parents, args, context) => {
            let events = await context.controller('Event').getPast()
            if (args.limit) {
                events = events.slice(0, args.limit)
            }
            return events
        },
    },
    Event: {
        _eventLocationFormatted: parent => {
            if (parent.eventType === 'physical') {
                return `${parent.eventLocation.city}, ${parent.eventLocation.country}`
            }
            return 'Online'
        },
        _eventTimeFormatted: parent => {
            return dateUtils.formatDateInterval(
                parent.startTime,
                parent.endTime
            )
        },
        _eventStatus: parent => {
            return EventHelpers.getEventStatus(parent, moment)
        },
        _myRegistration: (parent, args, context) => {
            return context
                .controller('Registration')
                .getByIdAndUser(parent._id, context.userId)
        },
    },
}

module.exports = {
    QueryType,
    Resolvers,
    Types: {
        EventType,
    },
}
