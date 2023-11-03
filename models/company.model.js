const mongoose = require('mongoose');

const company = new mongoose.Schema({
    companyName: {
        type : String 
    },
    post : {
        type : String 
    },
    description : {
        type : String 
    },
    startData : {
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
    }
},
{
   timestamps : true  
})