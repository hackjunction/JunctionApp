const mongoose = require('mongoose');

const { Countries } = require('@hackjunction/shared');

const AddressSchema = new mongoose.Schema({
    country: {
        type: String,
        enum: Countries.asArrayOfName,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    venueName: {
        type: String
    }
});

module.exports = AddressSchema;
