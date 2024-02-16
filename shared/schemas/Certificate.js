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
})

module.exports = {
    mongoose: CertificateSchema,
}
