const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql')

const MongoFileSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    uploadData: {
        type: String,
    },
    type: {
        type: String,
    },
    size: {
        type: Number,
    },

})

const MongoFile = new GraphQLObjectType({
    name: 'MongoFile',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        uploadData: {
            type: GraphQLNonNull(GraphQLString),
        },
        type: {
            type: GraphQLNonNull(GraphQLString),
        },
        size: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
})

const MongoFileInput = new GraphQLInputObjectType({
    name: 'MongoFileInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        uploadData: {
            type: GraphQLNonNull(GraphQLString),
        },
        type: {
            type: GraphQLNonNull(GraphQLString),
        },
        size: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
})

module.exports = {
    mongoose: MongoFileSchema,
    graphql: MongoFile,
    graphqlInput: MongoFileInput,
}



