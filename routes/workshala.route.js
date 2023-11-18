const express = require('express');
const router = express.Router();
const {workshalaCtrl} = require("../controllers/workshala.controller");
const {token} = require("../utils/token.util")

router.get("/dashboard" , token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/profile", token.verifyAccessToken, workshalaCtrl.getProfile);
router.post("/update/profile" , token.verifyAccessToken, workshalaCtrl.updateProfile);
router.get("/jobs",  workshalaCtrl.getJobs);
router.get("/jobsByPreferences", token.verifyAccessToken,  workshalaCtrl.jobByPreferences);
router.get("/getCompanies", workshalaCtrl.getCompanies);
router.get("/getJobsByCompanyName", workshalaCtrl.getJobsByCompanyName);


module.exports = router; 