const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInputObjectType,
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
        },
    }),
}
