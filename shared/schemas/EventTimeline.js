const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
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
    fields: () => ({
        title: {
            type: GraphQLString,
        },
        startTime: {
            type: GraphQLDate,
        },
    }),
})

const EventTimelineType = new GraphQLObjectType({
    name: 'EventTimeline',
    fields: {
        items: { type: GraphQLList(EventTimelineItemType) },
    },
})

module.exports = {
    mongoose: EventTimelineSchema,
    graphql: EventTimelineType,
}
