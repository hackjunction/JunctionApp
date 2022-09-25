const mongoose = require('mongoose')

const ReferralSchema = new mongoose.Schema({
    registrationId: {
        type: String,
    },
    score: {
        type: Number,
    },
    minted: {
        type: String,
    },
})

const Referral = mongoose.model('Referral', ReferralSchema)
module.exports = Referral
