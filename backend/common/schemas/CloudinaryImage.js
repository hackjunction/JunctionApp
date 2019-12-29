const mongoose = require('mongoose')

const CloudinaryImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
})

module.exports = CloudinaryImageSchema
