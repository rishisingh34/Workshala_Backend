const User = require("../models/user.model")
const bcryptjs = require("bcryptjs")

const userCtrl = {
    signUp : async (req, res) => {
        try {
            // storing responses recieved from client side
            const {email , password , firstName , lastName} = req.body; 

            // concatenating to get fullName 
            const name = firstName + " " + lastName ; 
            
            // this block checks if email already exists 
           const checkEmail = await User.findOne({ email });
           if( checkEmail ){
            res.status(409).json({ success : false , message : "User already Exists"}); 
            return ; 
           }

           // hashing Password using bcrypt 
           const hashedPassword = await bcryptjs.hash(password, 8);

           // storing user's info in database 
           const newUser = new User({
            name : name ,
            email : email ,
            password : hashedPassword
           })

           // saving the newUser info 
           await newUser.save();

           // status 201 ---> Created + Sending user's data immediately to the frontend 
           res.status(201).json({ success : true, 
                message : "User Created Succesfully",
                data : {
                    name : name ,
                    email : email ,
                    password : hashedPassword
                }
            });

        } catch(err){
            res.status(500).json({ error : "Internal Server Error"});
        }
    },

    login : async (req, res) => {
        
    }
}

module.exports = {userCtrl}