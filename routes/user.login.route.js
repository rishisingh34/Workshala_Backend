const express = require("express");
const router = express.Router();
const { userCtrl } = require("../controllers/auth.controller");

router.post("/login", userCtrl.login);
router.post("/refreshToken", userCtrl.refreshToken);

module.exports = router;
