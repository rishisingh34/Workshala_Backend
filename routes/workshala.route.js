const express = require('express');
const router = express.Router();
const {workshalaCtrl} = require("../controllers/workshala.controller");
const {token} = require("../utils/token.util")

router.get("/dashboard" , token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/resume");
router.get("/jobs");


module.exports = router; 