const mongoose = require('mongoose')
const TeamRole = require('./TeamRole')

const mongooseSchema = new mongoose.Schema({
    userId: {
        type: String,

    },
    roles: {
        type: [TeamRole.mongoose],

        default: [],
    },
    motivation: {
        type: String,

    },
}, { _id: false })

module.exports = {
    mongoose: mongooseSchema,
}
