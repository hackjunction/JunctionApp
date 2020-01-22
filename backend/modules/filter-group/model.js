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
                validate: {
                    validator(v) {
                        return v in FilterTypes.filterTypes
                    },
                    message: () =>
                        `Filter type must be one of ${Object.keys(
                            FilterTypes.filterTypes
                        ).join(',')}`,
                },
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
