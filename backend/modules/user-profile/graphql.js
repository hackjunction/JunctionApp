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

const UserProfileType = new GraphQLObjectType({
    name: 'UserProfile',
    fields: {
        userId: {
            type: GraphQLID,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        avatar: {
            type: GraphQLString,
        },
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        myProfile: {
            type: UserProfileType,
        },
        userProfileById: {
            type: UserProfileType,
            args: {
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
        myProfile: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            return context.controller('UserProfile').getByUserId(userId)
        },
        userProfileById: async (parent, args, context) => {
            return context.controller('UserProfile').getByUserId(args.userId)
        },
        userProfiles: (parent, args, context) => {
            return context.controller('UserProfile').getAll()
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
