const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  slot_time: {
    type: String,
  },
  slot_date: {
    type: String,
  },

  created_at: {
    type: Date,
  },
});

const Slot = mongoose.model('Slot', SlotSchema)

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  slots: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot'
    },
    createdAt: {
        type: Date,
  }
});

// FilterGroupSchema.set('timestamps', true);
// FilterGroupSchema.index({ event: 1, label: 1 }, { unique: true });

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = { Mentor, Slot } ;
