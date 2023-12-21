const express = require("express");
const router = express.Router();
const { workshalaCtrl } = require("../controllers/workshala.controller");
const { Token } = require("../middlewares/token.middleware");
const upload = require("../middlewares/multer.middleware");

router.get("/dashboard", Token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/profile", Token.verifyAccessToken, workshalaCtrl.getProfile);
router.post(
  "/update/profile",
  Token.verifyAccessToken,
  upload.single('profileImage'), 
  workshalaCtrl.updateProfile
);
router.get("/jobs", workshalaCtrl.getJobs);
router.get(
  "/jobsByPreferences",
  Token.verifyAccessToken,
  workshalaCtrl.jobByPreferences
);
router.get("/getCompanies", workshalaCtrl.getCompanies);
router.get("/getJobsByCompanyName", workshalaCtrl.getJobsByCompanyName);

// router.post("/addToCart" , Token.verifyAccessToken ,workshalaCtrl.addToCart);
// router.get("/getCartItems", Token.verifyAccessToken, workshalaCtrl.getCartItems);

module.exports = router;
