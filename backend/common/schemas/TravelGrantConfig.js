const mongoose = require('mongoose');

const { Currencies } = require('@hackjunction/shared');

const TravelGrantConfigSchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        required: true,
        default: false
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        enum: Currencies.keys,
        required: true,
        default: 'EUR'
    }
});

module.exports = TravelGrantConfigSchema;
