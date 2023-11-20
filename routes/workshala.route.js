const express = require("express");
const router = express.Router();
const { workshalaCtrl } = require("../controllers/workshala.controller");
const { Token } = require("../middlewares/token.middleware");
const upload = require("../middlewares/multer.middleware").default;

router.get("/dashboard", Token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/profile", Token.verifyAccessToken, workshalaCtrl.getProfile);
router.post(
  "/update/profile",
  Token.verifyAccessToken,
  upload.single("profileImg"),
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

module.exports = router;
