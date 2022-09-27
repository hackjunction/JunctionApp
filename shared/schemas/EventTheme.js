const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')

const EventThemeSchema = new mongoose.Schema({
    headerBackgroundColor: {
        type: String,
        default: '#ffffff',
    },
    headerTextColor: {
        type: String,
        default: '#000000',
    },
    bodyBackgroundColor: {
        type: String,
        default: '#ffffff',
    },
    detailsBackgroundColor: {
        type: String,
        default: '#ffffff',
    },
    detailsTextColor: {
        type: String,
        default: '#000000',
    },
    sidebarBackgroundColor: {
        type: String,
        default: '#ffffff',
    },
    sidebarTextColor: {
        type: String,
        default: '#000000',
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
}
