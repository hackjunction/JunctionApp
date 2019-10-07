const mongoose = require("mongoose");

const RecruitmentActionSchema = new mongoose.Schema({
  recruiter: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['favorite', 'remove-favorite', 'message', 'remind'],
    required: true
  },
  data: {
    type: mongoose.Mixed,
    default: {}
  }
});

RecruitmentActionSchema.set('timestamps', true);

const RecruitmentAction = mongoose.model(
  "RecruitmentAction",
  RecruitmentActionSchema
);

module.exports = {RecruitmentAction, RecruitmentActionSchema};
