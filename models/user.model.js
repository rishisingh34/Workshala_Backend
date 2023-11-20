const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true 
    },
    password : {
        type : String 
    }, 
    email :  {
        type : String ,
        required : true , 
        unique : true  
    },
    contact : {
        type : Number 
    },
    imageUrl :{
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
    googleId : {
        type : String,
        unique : true
    },
    googleAccessToken : {
        type : String
    }
})

module.exports = mongoose.model('users', userSchema) ;