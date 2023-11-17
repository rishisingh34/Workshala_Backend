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
        type : Number ,
        required : true
    },
    image :{
        type : String, // cloudinary url 
    },
    isVerified :{
        type : Boolean,
        default : false 
    },
    verificationToken : {
        token : String, 
        expiration : Date,  
    },
    appliedJobs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'jobs'
        }
    ],
    coursesBought : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'courses'
        }
    ],
})

module.exports = mongoose.model('users', userSchema) ;