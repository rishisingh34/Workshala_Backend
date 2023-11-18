const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    location : {
        type : String,
    },
    
})

module.exports = mongoose.model('companies', companySchema);