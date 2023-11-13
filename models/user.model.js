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
    avatar  :{
        type : String, // cloudinary url 
    },
    isVerified :{
        type : Boolean,
        default : false 
    },
    appliedJobs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'jobs',
            default:[]
        }
    ],
    coursesBought : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'courses',
            default : []
        }
    ],
})

module.exports = mongoose.model('users', userSchema) ;