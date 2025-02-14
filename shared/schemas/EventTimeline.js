const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
// const { GraphQLDate } = require('graphql-iso-date')
const { DateResolver } = require('graphql-scalars')

const mongoose = require('mongoose')

const EventTimelineSchema = new mongoose.Schema({
    items: [
        {
            title: {
                type: String,
            },
            startTime: {
                type: Date,
            },
        },
    ],
})

const EventTimelineItemType = new GraphQLObjectType({
    name: 'EventTimelineItem',
    fields: {
        title: {
            type: GraphQLNonNull(GraphQLString),
        },
        startTime: {
            type: GraphQLNonNull(DateResolver),
        },
    },
})

const EventTimelineItemInput = new GraphQLInputObjectType({
    name: 'EventTimelineItemInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        title: {
            type: GraphQLNonNull(GraphQLString),
        },
        startTime: {
            type: GraphQLNonNull(DateResolver),
        },
    },
})

const EventTimelineType = new GraphQLObjectType({
    name: 'EventTimeline',
    fields: {
        items: { type: GraphQLList(EventTimelineItemType) },
    },
})

const EventTimelineInput = new GraphQLInputObjectType({
    name: 'EventTimelineInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        items: { type: GraphQLList(EventTimelineItemInput) },
    },
})

module.exports = {
    mongoose: EventTimelineSchema,
    graphql: EventTimelineType,
    graphqlInput: EventTimelineInput,
    itemInput: EventTimelineItemInput,
}
