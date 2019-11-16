const mongoose = require('mongoose');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');
const AddressSchema = require('../../common/schemas/Address');
const { TravelGrantDetailsValidationSchema } = require('@hackjunction/shared');
const yup = require('yup');

const TravelGrantSchema = new mongoose.Schema({
    legalName: {
        firstName: {
            required: true,
            type: String
        },
        middleName: {
            required: false,
            type: String
        },
        lastName: {
            required: true,
            type: String
        }
    },
    dateOfBirth: {
        required: true,
        type: Date
    },
    address: {
        required: true,
        type: AddressSchema
    },
    hasSSN: {
        type: Boolean,
        required: true
    },
    SSN: {
        type: String,
        required: true
    },
    hasIBAN: {
        type: Boolean,
        required: true
    },
    IBAN: {
        accountNumber: {
            type: String
        },
        bankName: {
            type: String
        },
        swift: {
            type: String
        }
    },
    receiptsPdf: {
        required: true,
        type: CloudinaryImageSchema
    },
    receiptsSum: {
        type: Number,
        required: true
    }
});
TravelGrantSchema.pre('save', function(next) {
    const schema = yup.object().shape(TravelGrantDetailsValidationSchema);
    schema
        .validate(this, { stripUknown: true })
        .then(() => {
            next();
        })
        .catch(error => {
            throw `${error.name}: ${error.errors.toString()}`;
        });
});

module.exports = TravelGrantSchema;
