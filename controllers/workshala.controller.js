const jobs = require("../models/job.model");
const User = require("../models/user.model");

const workshalaCtrl = {
    dashBoard : async (req, res) => {
        try {
            res.status(200).json(req.user);

        }catch(err){
            res.send(err); 
        }
    }
};

module.exports = {workshalaCtrl};