const mongoose = require('mongoose')
const TeamRole = require('./TeamRole')

const mongooseSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    headline: {
        type: String,
    },
    avatar: {
        type: String,
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
