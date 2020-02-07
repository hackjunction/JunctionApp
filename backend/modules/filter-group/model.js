const mongoose = require('mongoose')
const { FilterTypes } = require('@hackjunction/shared')

const FilterGroupSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    filters: [
        {
            label: {
                type: String,
            },
            path: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: Object.keys(FilterTypes.filterTypes),
            },
            value: {
                type: mongoose.Mixed,
            },
        },
    ],
})

FilterGroupSchema.set('timestamps', true)
FilterGroupSchema.index({ event: 1, label: 1 }, { unique: true })

const FilterGroup = mongoose.model('FilterGroup', FilterGroupSchema)

module.exports = FilterGroup
