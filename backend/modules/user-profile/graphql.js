const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql')

const { UserProfileFields } = require('../graphql-shared-types')

const extraFields = UserProfileFields.toConfig().fields

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
        ...extraFields,
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

const Resolvers = {
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

module.exports = {
    QueryType,
    Resolvers,
    Types: {
        UserProfileType,
    },
}
