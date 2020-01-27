const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
} = require('graphql')

const { Answers, TravelGrantDetails } = require('../graphql-shared-types')

const RegistrationType = new GraphQLObjectType({
    name: 'Registration',
    fields: () => {
        const { UserProfileType } = require('../user-profile/graphql').Types //eslint-disable-line
        const { EventType } = require('../event/graphql').Types //eslint-disable-line

        return {
            /** Fields from DB model */
            _id: {
                type: GraphQLNonNull(GraphQLID),
            },
            user: {
                type: GraphQLNonNull(GraphQLID),
            },
            event: {
                type: GraphQLNonNull(GraphQLID),
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
                type: GraphQLList(GraphQLString),
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
            _user: {
                type: UserProfileType,
            },
            _event: {
                type: EventType,
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
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        registrationById: {
            type: RegistrationType,
            args: {
                _id: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        registrations: {
            type: GraphQLList(RegistrationType),
        },
        registrationsByEvent: {
            type: GraphQLList(RegistrationType),
            args: {
                eventId: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
        },
        registrationsByUser: {
            type: GraphQLList(RegistrationType),
            args: {
                userId: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
    },
})

const Resolvers = {
    Query: {
        myRegistration: (parent, args, context) => {
            return context
                .controller('Registration')
                .getByIdAndUser(args.eventId, context.userId)
        },
        registrationById: (parent, args, context) => {
            return context.controller('Registration').getById(args._id)
        },
        registrations: (parent, args, context) => {
            return context.controller('Registration').getAll()
        },
        registrationsByEvent: (parent, args, context) => {
            return context.controller('Registration').getByEventId(args.eventId)
        },
        registrationsByUser: (parent, args, context) => {
            return context.controller('Registration').getByUserId(args.userId)
        },
    },
    Registration: {
        _user: (parent, args, context) => {
            return context.controller('UserProfile').getByUserId(parent.user)
        },
        // _event: (parent, args, context) => {
        //     return context.controller('Event').getById(parent.event)
        // },
    },
}

const RegistrationModule = {
    QueryType,
    Resolvers,
    Types: {
        RegistrationType,
    },
}

module.exports = RegistrationModule
