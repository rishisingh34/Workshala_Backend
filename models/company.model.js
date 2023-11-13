const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    buisnessEmail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('companies', companySchema);