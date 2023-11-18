const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  description : {
    type : String 
  },
  industry: {
    type: String,
  },
  location: [
    {
      type: String,
    },
  ],
  companyType: {
    type: String,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs',
    },
  ],
});

module.exports = mongoose.model('companies', companySchema);