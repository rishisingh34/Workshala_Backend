const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  currentCity: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  language: {
    type: String,
  },
  studentType: {
    type: String,
  },
  preferences: {
    type: Array,
    default: [],
  },
  positionApplied: {
    type: String,
    enum: ["Internship", "Full-Time"],
  },
  workLocation: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("resume", resumeSchema);