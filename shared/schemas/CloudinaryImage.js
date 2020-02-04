const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString } = require('graphql')

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

module.exports = {
    mongoose: CloudinaryImageSchema,
    graphql: CloudinaryImageType,
}
