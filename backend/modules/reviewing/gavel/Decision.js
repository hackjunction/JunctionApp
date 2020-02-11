'use strict'
const mongoose = require('mongoose')

const GavelDecisionSchema = new mongoose.Schema({
    annotator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GavelAnnotator',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GavelProject',
        required: true,
    },
    loser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GavelProject',
        required: true,
    },
})

GavelDecisionSchema.set('timestamps', true)

/** TODO: Is it necessary to index these? */
GavelDecisionSchema.index({ event: 1, annotator: 1 })

const GavelDecision = mongoose.model('GavelDecision', GavelDecisionSchema)

module.exports = GavelDecision
