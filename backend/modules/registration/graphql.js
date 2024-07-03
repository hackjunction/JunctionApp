const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
} = require('graphql')
const { GraphQLJSONObject } = require('graphql-type-json')

const {
    Answers,
    TravelGrantDetails,
    Checklist,
} = require('../graphql-shared-types')

const RegistrationType = new GraphQLObjectType({
    name: 'Registration',
    fields: () => {
        return {
            /** Fields from DB model */
            _id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            user: {
                type: require('../user-profile/graphql').Types.UserProfileType,
            },
            event: {
                type: require('../event/graphql').Types.EventType,
            },
            status: {
                type: GraphQLString,
            },
            assingedTo: {
                type: GraphQLString,
            },
            rating: {
                type: GraphQLInt,
            },
            ratedBy: {
                type: GraphQLString,
            },
            tags: {
                type: new GraphQLList(GraphQLString),
            },
            checklist: {
                type: Checklist,
            },
            answers: {
                type: Answers,
            },
            travelGrant: {
                type: GraphQLInt,
            },
            travelGrantStatus: {
                type: GraphQLString,
            },
            travelGrantDetails: {
                type: TravelGrantDetails,
            },
            travelGrantComment: {
                type: GraphQLString,
            },
            travelGrantAmount: {
                type: GraphQLFloat,
            },
            /** Custom fields */
            _fullAnswers: {
                type: GraphQLJSONObject,
            },
        }
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        myRegistration: {
            type: RegistrationType,
            args: {
                eventId: {
                    type: GraphQLID,
                },
                eventSlug: {
                    type: GraphQLString,
                },
            },
        },
        registrationById: {
            type: RegistrationType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
        registrations: {
            type: new GraphQLList(RegistrationType),
        },
        registrationsByEvent: {
            type: new GraphQLList(RegistrationType),
            args: {
                eventId: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
        },
        registrationsByUser: {
            type: new GraphQLList(RegistrationType),
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateRegistrationAnswers: {
            type: RegistrationType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                answers: {
                    type: new GraphQLNonNull(GraphQLJSONObject),
                },
            },
        },
    },
})

const Resolvers = {
    Query: {
        myRegistration: async (parent, args, context) => {
            if (args.eventId) {
                return context
                    .controller('Registration')
                    .getByIdAndUser(args.eventId, context.userId)
            }
            if (args.eventSlug) {
                const event = await context
                    .controller('Event')
                    .getBySlug(args.eventSlug)
                if (event) {
                    return context
                        .controller('Registration')
                        .getByIdAndUser(event._id, context.userId)
                }
            }
            return null
        },
        registrationById: async (parent, args, context) => {
            return context.controller('Registration').getById(args._id)
        },
        registrations: async (parent, args, context) => {
            return context.controller('Registration').getAll()
        },
        registrationsByEvent: async (parent, args, context) => {
            return context.controller('Registration').getByEventId(args.eventId)
        },
        registrationsByUser: async (parent, args, context) => {
            return context.controller('Registration').getByUserId(args.userId)
        },
    },
    Mutation: {
        updateRegistrationAnswers: async (parent, args, context) => {
            return context.controller('Registration').getById(args._id)
        },
    },
    Registration: {
        user: (parent, args, context) => {
            return context.controller('UserProfile').getByUserId(parent.user)
        },
        event: (parent, args, context) => {
            return context.controller('Event').getById(parent.event)
        },

        _fullAnswers: parent => {
            return parent.answers
        },
    },
}

module.exports = {
    QueryType,
    MutationType,
    Resolvers,
    Types: {
        RegistrationType,
    },
}
