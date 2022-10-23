const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')

// TODO: The Project ref here might be an issue
const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
})

const TrackInput = new GraphQLInputObjectType({
    name: 'TrackInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
        winner: {
            type: GraphQLString,
        },
    },
})

const TrackType = new GraphQLObjectType({
    name: 'Track',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
        winner: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: TrackSchema,
    graphql: TrackType,
    graphqlInput: TrackInput,
}
