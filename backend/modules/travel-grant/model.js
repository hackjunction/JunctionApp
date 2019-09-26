const mongoose = require('mongoose');
const { Misc } = require('@hackjunction/shared');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');

const TravelGrantSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: String,
        required: true
    },
    travelsFrom: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Misc.travelGrantStatuses.ids,
        default: Misc.travelGrantStatuses.items.accepted.id
    },
    sum: {
        type: Number
    },
    receipt: CloudinaryImageSchema
});

TravelGrantSchema.index({ event: 1, user: 1 }, { unique: true });
TravelGrantSchema.set('timestamps', true);

const TravelGrant = mongoose.model('TravelGrant', TravelGrantSchema);

module.exports = TravelGrant;
