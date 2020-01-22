const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    printSchema,
} = require('graphql')
const {
    makeExecutableSchema,
    // addSchemaLevelResolveFunction,
    // TODO: This could still be used to be able to define the controller class instance just once,
    // but we'll see about that later
} = require('graphql-tools')

const UserProfileController = require('./graphql-controller')

const UserProfileType = new GraphQLObjectType({
    name: 'UserProfile',
    fields: {
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        userProfileById: {
            type: UserProfileType,
            arguments: {
                userId: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        userProfiles: {
            type: GraphQLNonNull(GraphQLList(UserProfileType)),
        },
    },
})

const resolvers = {
    Query: {
        userProfileById: (parent, args, { req }) => {
            const controller = new UserProfileController(req.user)
            return controller.getByUserId(args.userId)
        },
        userProfiles: (parent, args, { req }) => {
            const controller = new UserProfileController(req.user)
            return controller.getAll()
        },
    },
}

const rawSchema = new GraphQLSchema({
    query: QueryType,
})

const stringSchema = printSchema(rawSchema)
const UserProfileSchema = makeExecutableSchema({
    typeDefs: stringSchema,
    resolvers,
})

module.exports = {
    UserProfileSchema,
    UserProfileType,
}
