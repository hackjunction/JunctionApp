const mongoose = require('mongoose');

const EmailTaskSchema = new mongoose.Schema({
    message: mongoose.Mixed,
    deliveredAt: {
        type: Date
    },
    schedule: {
        type: Date,
        default: Date.now
    },
    eventId: String,
    userId: String,
    type: String
});

EmailTaskSchema.set('timestamps', true);
EmailTaskSchema.index(
    {
        eventId: 1,
        userId: 1,
        type: 1
    },
    {
        unique: true
    }
);

const EmailTask = mongoose.model('EmailTask', EmailTaskSchema);

module.exports = EmailTask;
