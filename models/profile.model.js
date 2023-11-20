const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  about: {
    type: String,
  },
  skills: {
    type: Array,
    default: [],
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
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },
  ],
  coursesBought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
});

module.exports = mongoose.model("profile", profileSchema);