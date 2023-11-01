const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql')

const MapSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    filename: {
        type: String,
    },
    uploadData: {
        type: String,
    },
    fileSize: {
        type: Number,
    },
})

const MapType = new GraphQLObjectType({
    name: 'Map',
    fields: {
        filename: {
            type: GraphQLNonNull(GraphQLString),
        },
        uploadData: {
            type: GraphQLNonNull(GraphQLString),
        },
        fileSize: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
})

const MapInput = new GraphQLInputObjectType({
    name: 'WebhookInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        filename: {
            type: GraphQLNonNull(GraphQLString),
        },
        uploadData: {
            type: GraphQLNonNull(GraphQLString),
        },
        fileSize: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
})

module.exports = {
    mongoose: MapSchema,
    graphql: MapType,
    graphqlInput: MapInput,
}
}


