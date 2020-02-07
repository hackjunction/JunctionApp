const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
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
}
