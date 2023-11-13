const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    },
    description : {
        type : String ,
        required : true 
    },
    videoFile : {
        type : String , // cloudinary url 
        require : true 
    },
    thumbnail : {
        type : String , // cloudinary URL 
        require : true 
    },
    duration : {
        type : Number , // cloudinary URL 
        required : true 
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        requierd : true 
    }
})

module.exports = mongoose.model("courses", courseSchema); 
