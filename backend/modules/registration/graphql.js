const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    printSchema,
} = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const { UserProfileType } = require('../user-profile/graphql')

const RegistrationType = new GraphQLObjectType({
    name: 'Registration',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
        },
        user: {
            type: GraphQLNonNull(GraphQLID),
        },
        _user: {
            type: UserProfileType,
        },
        event: {
            type: GraphQLNonNull(GraphQLID),
        },
        status: {
            type: GraphQLString,
        },
    }),
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
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

const resolvers = {
    Query: {
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
    },
}

const rawSchema = new GraphQLSchema({
    query: QueryType,
})

const stringSchema = printSchema(rawSchema)
const RegistrationSchema = makeExecutableSchema({
    typeDefs: stringSchema,
    resolvers,
})

module.exports = {
    RegistrationSchema,
    RegistrationType,
}
