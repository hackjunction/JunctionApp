const mongoose = require('mongoose');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage')
const AddressSchema = require('../../common/schemas/Address')
const { TravelGrantDetailsValidationSchema } = require('@hackjunction/shared');
const yup = require('yup');

const TravelGrantSchema = new mongoose.Schema({
    legalName: {
        required: true,
        type: {
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
        type: {
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
TravelGrantSchema.pre('save', function (next) {
    const schema = yup.object().shape(TravelGrantDetailsValidationSchema);
    schema.validate(this, { stripUknown: true })
        .then(() => {
            next();
        }).catch(error => {
            throw (`${error.name}: ${error.errors.toString()}`)
        });

});

module.exports = TravelGrantSchema;