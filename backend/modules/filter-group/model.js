const mongoose = require('mongoose');

const FilterGroupSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    filters: [
        {
            label: {
                type: String
            },
            path: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: [],
                required: true
            },
            value: {
                type: String
            }
        }
    ]
});

FilterGroupSchema.set('timestamps', true);
FilterGroupSchema.index({ event: 1, label: 1 }, { unique: true });

const FilterGroup = mongoose.model('FilterGroup', FilterGroupSchema);

module.exports = FilterGroup;
