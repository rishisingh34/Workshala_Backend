require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const token = {
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
  verifyAccessToken:  async (req, res, next) => {
    try {
      if (!req.headers["authorization"]) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const authHeader = req.headers["authorization"];
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   
      req.user = await User.findById(decoded.aud).select("-passwd");
      console.log(req.user)
      next();
    } catch (err) {
      res.status(500).json({ message : "Internal Server Error"});
    }
  },
  verifyRefreshToken : async (req, res , next) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          res.status(401).json({ message: "Invalid Token" });
          return;
        }
        userId = payload.aud;
        return userId;
      });
    }catch (err) {
      res.status(500).json({ message : "Internal Server Error"});
    }
  },
  verifyResetPasswordToken : async (req, res, next) => {
    try {
      const token = req.headers.authorization.spliy(" ")[1];
      const tokenDecoded = jwt.verify(token, process.env.RESET)

      req.user = await User.findOne(decoded.aud).select("-password");

      

    } catch (err) {
        res.status(500).json({ message : "Internal Server Error"});
    }
  }
};

module.exports = {token};

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