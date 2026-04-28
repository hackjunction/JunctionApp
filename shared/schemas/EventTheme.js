const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')

const EventThemeSchema = new mongoose.Schema({
    headerBackgroundColor: {
        type: String,
        default: '#0a1628',
    },
    headerTextColor: {
        type: String,
        default: '#73f9ec',
    },
    bodyBackgroundColor: {
        type: String,
        default: '#0d1f35',
    },
    detailsBackgroundColor: {
        type: String,
        default: '#0d1f35',
    },
    detailsTextColor: {
        type: String,
        default: '#ffffff',
    },
    sidebarBackgroundColor: {
        type: String,
        default: '#0a1628',
    },
    sidebarTextColor: {
        type: String,
        default: '#ffffff',
    },
    accentColor: {
        type: String,
        default: '#73f9ec',
    },
    linkColor: {
        type: String,
        default: '#52d7af',
    },
})

const EventThemeInput = new GraphQLInputObjectType({
    name: 'EventThemeInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        headerBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        headerTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        bodyBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        detailsBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        detailsTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        sidebarBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        sidebarTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        accentColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        linkColor: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const EventThemeType = new GraphQLObjectType({
    name: 'EventTheme',
    fields: {
        headerBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        headerTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        bodyBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        detailsBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        detailsTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        sidebarBackgroundColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        sidebarTextColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        accentColor: {
            type: GraphQLNonNull(GraphQLString),
        },
        linkColor: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: EventThemeSchema,
    graphql: EventThemeType,
    graphqlInput: EventThemeInput,
}
