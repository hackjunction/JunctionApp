const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
} = require('graphql')

const CloudinaryImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
})
const CloudinaryImageType = new GraphQLObjectType({
    name: 'CloudinaryImage',
    fields: {
        url: {
            type: GraphQLString,
        },
        publicId: {
            type: GraphQLString,
        },
    },
})
const CloudinaryImageInput = new GraphQLInputObjectType({
    name: 'CloudinaryImageInput',
    fields: {
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        _id: {
            type: GraphQLString,
        },
    },
})

const CloudinaryImageInput = new GraphQLInputObjectType({
    name: 'CloudinaryImageInput',
    fields: {
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        _id: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: CloudinaryImageSchema,
    graphql: CloudinaryImageType,
    graphqlInput: CloudinaryImageInput,
}