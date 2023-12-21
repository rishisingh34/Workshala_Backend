const Job = require("../models/job.model");
// const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const axios = require('axios');
const Company = require('../models/company.model');
const uploadOnCloudinary = require('../utils/cloudinary.util');
const Cart = require('../models/cart.model');

const workshalaCtrl = {
    dashBoard : async (req, res) => {
        try {
            const userId = req.user.id;
            const existingProfile = await Profile.findOne({ userId : userId });

            if(!existingProfile) {
                const newProfile = new Profile({
                    userId : userId,
                    name : req.user.name
                });
                await newProfile.save();
            }

            const { verificationToken , password , ...filteredData } = { ...req.user._doc } ;  

            res.status(200).json(filteredData);

        }catch(err){
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"}); 
        }
    },
    getProfile : async (req, res) => {       
        try{
            const userId = req.user.id;
            const existingProfile = await Profile.findOne({ userId: userId });
            res.status(200).json(existingProfile);
        }catch(err){
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }

    },
    updateProfile : async (req, res) => {
        try {
            // console.log(req.file);

            const localFilePath = req.file.path; // Get the path of the uploaded file
            // console.log(localFilePath);

            // Upload the file to Cloudinary
            const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
            console.log(cloudinaryResponse);

            // Check if file was successfully uploaded to Cloudinary
            if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
              return res
                .status(500)
                .json({ message: "Failed to upload image to Cloudinary" });

            }


            const profile = await Profile.findOneAndUpdate(
              { userId: req.user.id },
              {
                name: req.body.name,
                about: req.body.about,
                skills: req.body.skills || [],
                currentCity: req.body.currentCity,
                gender: req.body.gender,
                language: req.body.language,
                studentType: req.body.studentType,
                preferences: req.body.preferences || [],
                positionApplied: req.body.positionApplied,
                workLocation: req.body.workLocation || [],
                imageUrl: cloudinaryResponse.secure_url,
              }
            );

            res.status(200).json({ message : "Successfully updated profile" , profile : profile});

        }catch(err){
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
    },
    jobByPreferences : async (req, res) => {
        try {
            const userId = req.user.id;
            const userProfile = await Profile.findOne({ userId : userId});
            const preferences = userProfile.preferences;

            const recommendationApiUrl = `https://internship-recommendation-modal2.onrender.com/recommendations/${preferences}`;
            const response = await axios.get(recommendationApiUrl);
            const recommendations = response.data.recommendations;
            const objectIds = recommendations.map((item) => item[0]);

            const jobs = await Job.find({ _id: { $in: objectIds }});
            res.status(200).json(jobs);
            

        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },
    getCompanies : async (req, res) => {
        try {
            const companies = await Company.find();
            res.status(200).json(companies);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },
    getJobsByCompanyName : async (req, res) => {
        try {
            const {companyName} = req.body;
            const jobs = await Job.find({ companyName: companyName });
            const company = await Job.findOne({ companyName: companyName });
            
            
            res.status(200).json(jobs);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },

    // addToCart : async (req, res) => {
    //     try {
    //         const {jobId} = req.body ;

    //         const userId = req.user.id ;
    //         const existingCart = await Cart.findOne({ userId : userId });

    //         if(!existingCart){
    //             const newCart = new Cart({
    //                 userId : userId ,
    //                 jobsApplied : [jobId]
    //             });               

    //             await newCart.save();
    //         } else {
    //             if (!Array.isArray(existingCart.jobsApplied)) {
    //               existingCart.jobsApplied = []; 
    //             }

    //             if (!existingCart.jobsApplied.includes(jobId)) {
    //               existingCart.jobsApplied.push(jobId);
    //               await existingCart.save();
    //             } else {
                  
    //               return res
    //                 .status(400)
    //                 .json({ message: "Job is already in the Cart" });
    //             }
    //         }
            
    //         const job = await Job.findById(jobId);
            
    //         job.applicants.push(userId);
    //         await job.save();

    //         return res.status(201).json({message : "Job Added to Cart Successfully"});           


    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message : "Internal Server Error"});
    //     }
    // },
    // getCartItems : async (req, res) => {
    //     try {
    //         const userId = req.user.id ;
    //         const cart = await Cart.findOne({ userId : userId}).populate('jobsApplied');

    //         if( !cart || !cart.jobsApplied.length ) {
    //             return res.status(404).json({ message: "No Items found in Cart" });
    //         
    //         } else{
    //             const jobs = cart.jobsApplied;
    //             return res.status(200).json({ jobs });
    //            
    //         }

    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message : "Internal Server Error "});
    //     }
    // }
};

module.exports = {workshalaCtrl};

