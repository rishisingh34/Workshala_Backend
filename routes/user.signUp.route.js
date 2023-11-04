const express = require("express");
const router = express.Router();
const { userCtrl } = require("../controllers/auth.controller");

router.post("/signUp", userCtrl.signUp);

module.exports = router;
