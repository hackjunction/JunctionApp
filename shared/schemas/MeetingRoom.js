const {
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const mongoose = require('mongoose')

const MeetingRoomSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    timeSlots: [
        {
            start: {
                type: Date,
            },
            end: {
                type: Date,
            },
            reserved: {
                type: Boolean,
            },
        },
    ],
})

const MeetingRoomType = new GraphQLObjectType({
    name: 'MeetingRoom',
    fields: {
        _id: {
            type: GraphQLNonNull(GraphQLID),
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        capacity: {
            type: GraphQLNonNull(GraphQLInt),
        },
        timeSlots: {
            type: GraphQLList(
                new GraphQLObjectType({
                    name: 'MeetingRoomTimeSlot',
                    fields: {
                        _id: {
                            type: GraphQLNonNull(GraphQLID),
                        },
                        start: {
                            type: GraphQLNonNull(GraphQLDate),
                        },
                        end: {
                            type: GraphQLNonNull(GraphQLDate),
                        },
                        reserved: {
                            type: GraphQLNonNull(GraphQLBoolean),
                        },
                    },
                }),
            ),
        },
    },
})

const MeetingRoomInput = new GraphQLInputObjectType({
    name: 'MeetingRoomInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        capacity: {
            type: GraphQLNonNull(GraphQLInt),
        },
        timeSlots: {
            type: GraphQLList(
                new GraphQLInputObjectType({
                    name: 'MeetingRoomTimeSlotInput',
                    fields: {
                        _id: {
                            type: GraphQLString,
                        },
                        start: {
                            type: GraphQLNonNull(GraphQLDate),
                        },
                        end: {
                            type: GraphQLNonNull(GraphQLDate),
                        },
                        reserved: {
                            type: GraphQLNonNull(GraphQLBoolean),
                        },
                    },
                }),
            ),
        },
    },
})

module.exports = {
    mongoose: MeetingRoomSchema,
    graphql: MeetingRoomType,
    graphqlInput: MeetingRoomInput,
}
