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

const UserProfileController = require('../user-profile/graphql-controller')
const { UserProfileType } = require('../user-profile/graphql')
const RegistrationController = require('./graphql-controller')

const RegistrationType = new GraphQLObjectType({
    name: 'Registration',
    fields: () => ({
        user: {
            type: GraphQLID,
        },
        _user: {
            type: UserProfileType,
        },
        event: {
            type: GraphQLID,
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
                    type: GraphQLNonNull(GraphQLString),
                },
            },
        },
    },
})

const resolvers = {
    Query: {
        registrationById: (parent, args, { req }) => {
            const controller = new RegistrationController(req.user)
            return controller.getById(args._id)
        },
        registrations: (parent, args, { req }) => {
            const controller = new RegistrationController(req.user)
            return controller.getAll()
        },
        registrationsByEvent: (parent, args, { req }) => {
            const controller = new RegistrationController(req.user)
            return controller.getByEventId(args.eventId)
        },
        registrationsByUser: (parent, args, { req }) => {
            const controller = new RegistrationController(req.user)
            return controller.getByUserId(args.userId)
        },
    },
    Registration: {
        _user: (parent, args, { req }) => {
            const controller = new UserProfileController(req.user)
            return controller.getByUserId(parent.user)
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
