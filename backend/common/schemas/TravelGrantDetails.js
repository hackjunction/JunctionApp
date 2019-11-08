const mongoose = require('mongoose');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage')
const AddressSchema = require('../../common/schemas/Address')

const TravelGrantSchema = new mongoose.Schema({
    legalName: {
        required: true,
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
    socialSecurityNumber: {
        required: false,
        issuingCountry: {
            required: true,
            type: String
        }, 
        number: {
            required: true,
            type: String
        }
    }, 
    address: {
        required: true,
        type: AddressSchema
    }, 
    bankDetails: {
        required: true,
        accountNumber: {
            type: String
        }, 
        swift: {
            type: String,
            minlength: 8,
            maxlength: 11 
        },
        bankName: {
            type: String
        }, 
        email: {
            type: String
        }
    }, 
    travelReceipt: {
        required: true,
        type: CloudinaryImageSchema
    }, 
    sumOfReceipts: {
        type: Number,
        required: true
    } 
});
TravelGrantSchema.pre('save', function(next) {
    // Do validation!
    next();
});

module.exports = TravelGrantSchema;