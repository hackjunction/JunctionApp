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

    },
    gender: {
        type: String,

    },
    dateOfBirth: {

        type: Date,
    },
    address: {

        type: AddressSchema.mongoose,
    },
    hasSSN: {
        type: Boolean,

    },
    SSN: {
        type: String,
    },
    hasIBAN: {
        type: Boolean,

    },
    IBAN: {
        type: IBANAccountSchema.mongoose,
    },
    receiptsPdf: {

        type: CloudinaryImageSchema.mongoose,
    },
    receiptsSum: {
        type: Number,

    },
}, { _id: false })

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
