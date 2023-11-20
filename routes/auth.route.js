const express = require("express");
const router = express.Router();
const { authCtrl } = require("../controllers/auth.controller");
// const {token } = require("../utils/token.util");

router.post("/signUp", authCtrl.signUp);
router.get("/verifyEmailPage", authCtrl.renderVerifyEmailPage);
router.post("/login", authCtrl.login);
router.post("/refreshToken", authCtrl.refreshToken);
router.post("/forgotPassword",  authCtrl.forgotPassword);
router.post("/verifyOtp", authCtrl.verifyOtp);
// router.post("/changePassword",  authCtrl.changePassword);

module.exports = router;
