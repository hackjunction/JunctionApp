const { GraphQLObjectType, GraphQLBoolean } = require('graphql')

module.exports = {
    graphql: new GraphQLObjectType({
        name: 'UserDetailsConfigItem',
        fields: {
            require: {
                type: GraphQLBoolean,
            },
            enable: {
                type: GraphQLBoolean,
            },
            editable: {
                type: GraphQLBoolean,
            },
        },
    }),
}
