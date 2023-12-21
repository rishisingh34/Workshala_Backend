require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const Token = {
  signAccessToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "10d",
        issuer: "workshala.com",
        audience: id,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  signRefreshToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "workshala.com",
        audience: id,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await User.findById(decoded.aud).select("-passwd");

      next();
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  verifyRefreshToken: async (refToken) => {
    try {
      // extracting the payload from the refresh token after verification
      const payload = jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET);

      // Checking if payload contains userId
      if (!payload.aud) {
        throw new Error("Invalid refresh token");
      }

      // Return the userId
      return payload.aud;
    } catch (err) {
      // Pass the error to the global error handler or handle it appropriately
      throw new Error("Token Verification Failed");
    }
  },
};

module.exports = {Token};

// check the access token recieved on website ---> jwt.io
// access token ---> 
// HEADER : {
//     "alg" : "HS256",
//     "typ" : "JWT"
// }

// PAYLOAD (DATA) : {
//     "name" : "User's name "
//     "iat" : 12922121  ---> issued at Date ( )
// }

// Verify Signature : 