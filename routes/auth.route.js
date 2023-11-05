const express = require("express");
const router = express.Router();
const { authCtrl } = require("../controllers/auth.controller");

router.post("/signUp", authCtrl.signUp);
router.post("/verifyEmail", authCtrl.verifyEmail);
router.post("/login", authCtrl.login);
router.post("/refreshToken", authCtrl.refreshToken);
router.post("/forgotPassword", authCtrl.forgotPassword);
router.post("/verifyOtp", authCtrl.verifyOtp);
router.post("/changePassword");

module.exports = router;
