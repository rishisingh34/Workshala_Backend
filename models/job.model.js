const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type : String 
    },
    jobType : {
        type : String
    },
    jobPosts : {
        type : Array
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
        ref : 'users', 
        default : [],
    }]
},
{
   timestamps : true  
});

module.exports = mongoose.model("jobs", jobSchema)