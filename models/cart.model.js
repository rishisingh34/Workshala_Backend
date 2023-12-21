const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  jobsApplied: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "jobs",
      },
    ],
    default : []
  },
});


module.exports = mongoose.model("cart", cartSchema) ; 