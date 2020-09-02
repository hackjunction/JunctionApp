const mongoose = require('mongoose');

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
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

MentorSchema.set('timestamps', true);
// FilterGroupSchema.index({ event: 1, label: 1 }, { unique: true });

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
