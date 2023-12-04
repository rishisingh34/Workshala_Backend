const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET_KEY = process.env.CLOUD_API_SECRET_KEY;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = cloudinary.uploader.upload(localFilePath, {
      resource_type : "raw",
    });

    // console.log("file is uploaded to cloudinary",(await response).secure_url);
    return response;

  } catch (err) {
    // remove the locally saved temporary file if uploading fails
    fs.unlink(localFilePath);
    console.log(err);
  }
};



module.exports = uploadOnCloudinary;
