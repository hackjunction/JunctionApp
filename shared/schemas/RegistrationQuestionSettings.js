const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
} = require('graphql')

module.exports = {
    graphql: new GraphQLObjectType({
        name: 'RegistrationQuestionSettings',
        fields: {
            options: {
                type: GraphQLList(GraphQLString),
            },
            default: {
                type: GraphQLBoolean,
            },
            maxSize: {
                type: GraphQLInt,
            },
            allowedTypes: {
                type: GraphQLList(GraphQLString),
            },
        },
    }),
    graphqlInput: new GraphQLInputObjectType({
        name: 'RegistrationQuestionSettingsInput',
        fields: {
            options: {
                type: GraphQLList(GraphQLString),
            },
            default: {
                type: GraphQLBoolean,
            },
            maxSize: {
                type: GraphQLInt,
            },
            allowedTypes: {
                type: GraphQLList(GraphQLString),
            },
        },
    }),
}
