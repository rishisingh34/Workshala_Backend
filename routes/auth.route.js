const express = require("express");
const router = express.Router();
const { authCtrl } = require("../controllers/auth.controller");
const {token } =require("../utils/token.util");

router.post("/signUp", authCtrl.signUp);
router.post("/verifyEmail", authCtrl.verifyEmail);
router.post("/login", authCtrl.login);
router.post("/refreshToken", authCtrl.refreshToken);
router.post("/forgotPassword",token.verifyAccessToken,  authCtrl.forgotPassword);
router.post("/verifyOtp", authCtrl.verifyOtp);
router.post("/changePassword",  authCtrl.changePassword);

module.exports = router;
