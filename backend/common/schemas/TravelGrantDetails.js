const mongoose = require('mongoose')
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage')
const AddressSchema = require('../../common/schemas/Address')

const TravelGrantSchema = new mongoose.Schema({
    legalName: {
        firstName: {
            required: true,
            type: String,
        },
        middleName: {
            required: false,
            type: String,
        },
        lastName: {
            required: true,
            type: String,
        },
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
        type: AddressSchema,
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
        accountNumber: {
            type: String,
        },
        bankName: {
            type: String,
        },
        swift: {
            type: String,
        },
    },
    receiptsPdf: {
        required: true,
        type: CloudinaryImageSchema,
    },
    receiptsSum: {
        type: Number,
        required: true,
    },
})

module.exports = TravelGrantSchema
