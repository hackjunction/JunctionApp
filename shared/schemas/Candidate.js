const mongoose = require('mongoose')
const TeamRole = require('./TeamRole')

const mongooseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
    },
    avatar: {
        type: String,
        required: false,
    },
    roles: {
        type: [TeamRole.mongoose],
        required: true,
        default: [],
    },
    motivation: {
        type: String,
        required: true,
    },
})

module.exports = {
    mongoose: mongooseSchema,
}
