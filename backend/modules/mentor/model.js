const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');

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
  slug: {
    type: String,
    required: true
  },
});


// MentorSchema.index(
//   {
//     slug: 1,
//   },
//   {
//     unique: true,
//   },
// );

// MentorSchema.plugin(mongooseSlugPlugin, {
//   tmpl: '<%=name%>',
//   alwaysUpdateSlug: false,
//   slugOptions: {
//     custom: {
//       "'": '',
//     },
//   },
// });

MentorSchema.set('timestamps', true);
// FilterGroupSchema.index({ event: 1, label: 1 }, { unique: true });

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
