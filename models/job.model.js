const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // companyId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "companies",
    // },
    companyName : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String
    },
    jobType : {
        type : String
    },
    description : {
        type : String 
    },
    startDate : {
        type : String 
    },
    stipend : {
        type : String 
    },
    duration : {
        type : String 
    },
    applyBy : {
        type : String 
    },
    applicants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }]
},
{
   timestamps : true  
});

module.exports = mongoose.model("jobs", jobSchema)

// db.jobs.insertOne({
//   companyName: "Google",
//   jobType: "Internship",
//   description: "Hiring Data Scientist",
//   startDate: "1 Dec",
//   stipend: "20,000",
//   duration: "3 months",
//   applyBy: "26 Nov",
// });