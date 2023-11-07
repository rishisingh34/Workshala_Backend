const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true 
    },
    password : {
        type : String ,
        required : true 
    }, 
    email :  {
        type : String ,
        required : true , 
        unique : true  
    },
    isVerified :{
        type : Boolean,
        default : false 
    },
    currentCity : {
        type : String 
    },
    gender : {
        type : String,
        enum:["Male","Female","Other"]
    },
    language : {
        type : String 
    },
    appliedJobs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobs',
        default:[]
    }],
    studentType : {
        type : String
    },
    preferences : {
        type : Array  
    },
    positionApplied : {
        type : String ,
        enum : ["Internship", "Full-Time"]
    },
    workLocation : {
        type : Array 
    }
})

module.exports = mongoose.model('users', userSchema) ;