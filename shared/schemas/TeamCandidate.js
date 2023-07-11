const mongoose = require('mongoose')

const mongooseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
    },
    motivation: {
        type: String,
        required: true,
    },
})

module.exports = {
    mongoose: mongooseSchema,
}
