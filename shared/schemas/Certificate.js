const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean,
} = require('graphql')
const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    publicId: {
        type: String,
    },
    x: {
        type: Number,
    },
    y: {
        type: Number,
    },
    color: {
        type: String,
    },
    enableRegistrationId: {
        type: Boolean,
    },
    registrationIdX: {
        type: Number,
    },
    registrationIdY: {
        type: Number,
    },
    registrationIdColor: {
        type: String,
    },
})

const CertificateType = new GraphQLObjectType({
    name: 'Certificate',
    fields: {
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        x: {
            type: GraphQLInt,
        },
        y: {
            type: GraphQLInt,
        },
        color: {
            type: GraphQLString,
        },
        enableRegistrationId: {
            type: GraphQLBoolean,
        },
        registrationIdX: {
            type: GraphQLInt,
        },
        registrationIdY: {
            type: GraphQLInt,
        },
        registrationIdColor: {
            type: GraphQLString,
        },
    },
})

const CertificateInput = new GraphQLInputObjectType({
    name: 'CertificateInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        x: {
            type: GraphQLInt,
        },
        y: {
            type: GraphQLInt,
        },
        color: {
            type: GraphQLString,
        },
        enableRegistrationId: {
            type: GraphQLBoolean,
        },
        registrationIdX: {
            type: GraphQLInt,
        },
        registrationIdY: {
            type: GraphQLInt,
        },
        registrationIdColor: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: CertificateSchema,
    graphql: CertificateType,
    graphqlInput: CertificateInput,
}
