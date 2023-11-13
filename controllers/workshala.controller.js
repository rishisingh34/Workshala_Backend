const Job = require("../models/job.model");
const User = require("../models/user.model");

const workshalaCtrl = {
    dashBoard : async (req, res) => {
        try {
            res.status(200).json(req.user);
        }catch(err){
            res.send(err); 
        }
    },
    getResume : async (req, res) => {
        try {
            const resume = await User.findOne({ id : req.user.id}).select()
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },
    getJobs : async (req, res) => {
        try {
            
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    }
};

module.exports = {workshalaCtrl};