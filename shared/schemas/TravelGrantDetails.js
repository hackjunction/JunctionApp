const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql')
const CloudinaryImageSchema = require('./CloudinaryImage')
const AddressSchema = require('./Address')
const LegalNameSchema = require('./LegalName')
const IBANAccountSchema = require('./IBANAccount')

const TravelGrantDetailsSchema = new mongoose.Schema({
    legalName: {
        type: LegalNameSchema.mongoose,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        required: true,
        type: Date,
    },
    address: {
        required: true,
        type: AddressSchema.mongoose,
    },
    hasSSN: {
        type: Boolean,
        required: true,
    },
    SSN: {
        type: String,
    },
    hasIBAN: {
        type: Boolean,
        required: true,
    },
    IBAN: {
        type: IBANAccountSchema.mongoose,
    },
    receiptsPdf: {
        required: true,
        type: CloudinaryImageSchema.mongoose,
    },
    receiptsSum: {
        type: Number,
        required: true,
    },
})

const TravelGrantDetailsType = new GraphQLObjectType({
    name: 'TravelGrantDetails',
    fields: {
        legalName: {
            type: GraphQLNonNull(LegalNameSchema.graphql),
        },
        email: {
            type: GraphQLNonNull(GraphQLString),
        },
        gender: {
            type: GraphQLNonNull(GraphQLString),
        },
        dateOfBirth: {
            type: GraphQLNonNull(GraphQLString),
        },
        address: {
            type: GraphQLNonNull(AddressSchema.graphql),
        },
        hasSSN: {
            type: GraphQLBoolean,
        },
        SSN: {
            type: GraphQLString,
        },
        hasIBAN: {
            type: GraphQLBoolean,
        },
        IBAN: {
            type: IBANAccountSchema.graphql,
        },
        receiptsPdf: {
            type: CloudinaryImageSchema.graphql,
        },
        receiptsSum: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
})

module.exports = {
    mongoose: TravelGrantDetailsSchema,
    graphql: TravelGrantDetailsType,
}
