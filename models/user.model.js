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
    contact : {
        type : Number 
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
    appliedInternships:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'internship',
        default:[]
    }],
    studentType : {
        type : String
    },
    preferences : {
        type : Array  
    },
    position : {
        type : String 
    },
    workLocation : {
        type : Array 
    }
})

module.exports = mongoose.model('users', userSchema) ;