const express = require('express');
const router = express.Router();
const {workshalaCtrl} = require("../controllers/workshala.controller");
const {token} = require("../utils/token.util")

router.get("/dashboard" , token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/profile", token.verifyAccessToken, workshalaCtrl.getProfile);
// router.post("/update/resume" , token.verifyAccessToken, workshalaCtrl.updateResume);
router.get("/jobs",  workshalaCtrl.getJobs);


module.exports = router; 