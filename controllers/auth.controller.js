const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { Token } = require("../middlewares/token.middleware");
const { sendmail, sendOtpMail } = require("../utils/mailer.util");
const Otp = require("../models/otp.model");
const crypto = require("crypto");
const tokenExpiration = Date.now() + 24 * 60 * 60 * 1000;
const authSchema = require("../utils/validationSchema.util");
const Joi = require("joi");

const authCtrl = {
  signUp: async (req, res) => {
    try {
      const validationErrors = [];

      try {
        await authSchema.validateAsync(req.body, { abortEarly: false });
      } catch (validationErr) {
        console.log(validationErr);
        validationErr.details.forEach((error) => {
          validationErrors.push(error.message);
        });
      }
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const result = await authSchema.validateAsync(req.body);
      const { email, password, name, number } = result;

      const user = await User.findOne({ email: email });

      const hashedPassword = await bcryptjs.hash(password, 8);

      if (user) {
        if (user.isVerified) {
          res.status(409).json({ message: "User already exists" });
          return;
        } else {
          if (
            !user.verificationToken.expiration ||
            user.verificationToken.expiration < Date.now()
          ) {
            const newToken = crypto.randomBytes(20).toString("hex");

            await User.findOneAndUpdate(
              { email: email },
              {
                $set: {
                  name: name,
                  password: hashedPassword,
                  contact: number,
                  verificationToken: {
                    token: newToken,
                    expiration: tokenExpiration,
                  },
                },
              }
            );

            res.status(200).json({
              message:
                "User updated successfully. Verification Link Sent Again",
            });
            return;
          } else {
            res.status(200).json({
              message:
                "Verification Link Already Sent. Check Your Email. New Verification Link Will Be Sent After 24Hrs",
            });
            return;
          }
        }
      }

      const token = crypto.randomBytes(20).toString("hex");
      const verificationLink = `https://workshala.onrender.com/verifyEmailPage?token=${token}`;

      const newUser = new User({
        name: name,
        password: hashedPassword,
        email: email,
        contact: number,
        isVerified: false,
        verificationToken: {
          token: token,
          expiration: tokenExpiration,
        },
      });

      await newUser.save();

      sendmail(email, verificationLink, "Email Verificaition Link");

      res.status(201).json({
        success: true,
        message: "User Created Successfully, Please Verify Email",
        data: {
          name: name,
          email: email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  renderVerifyEmailPage: async (req, res) => {
    try {
      const { token } = req.query;
      const user = await User.findOne({ "verificationToken.token": token });

      if (!user || user.verificationToken.expiration < Date.now()) {
        return res.status(404).json({ error: "Invalid or expired token" });
      }

      await User.findOneAndUpdate(
        { "verificationToken.token": token },
        {
          $set: { isVerified: true },
          $unset: { verificationToken: 1 },
        }
      );

      res.render("emailVerification");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      const passwordCheck = await bcryptjs.compare(password, user.password);

      if (!user.isVerified) {
        return res.status(401).json({ message: "Not Verified" });
      }

      if (passwordCheck) {
        const accessToken = await Token.signAccessToken(user.id);
        const refreshToken = await Token.signRefreshToken(user.id);

        // res.status(200).json({ message : "Login Successful"});
        res.cookie("accessToken", accessToken, {
          secure : true ,
          sameSite : 'None' 
        });

        return res.status(200).json({
          message: "Login Successful",
          user: {
            email,
            name: user.name,
          },
        });
      }

      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Email Not Found" });
        return;
      }

      if (!user.isVerified) {
        res.status(401).json({ message: "Email not Verified" });
        return;
      }

      const otp = Math.floor(1000 + Math.random() * 9000);
      let existingOtp = await Otp.findOne({ email });
      if (existingOtp) {
        await existingOtp.updateOne({ otp, createdAt: new Date() });
      } else {
        let newOtp = new Otp({
          email: email,
          otp: otp,
        });
        await newOtp.save();
      }
      console.log(otp);
      sendOtpMail(email, otp, "Reset Passowrd");

      res.json({
        success: true,
        message: "otp is sent to your registered email",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      if (!(await User.findOne({ email: email }))) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }

      let OTP = await Otp.findOne({ email: email });

      if (otp != OTP.otp) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }

      Otp.deleteOne({ email: email });

      const passwordSchema = Joi.string()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{8,}$/
        )
        .message(
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
        )
        .required();

      const { error: passwordError } = passwordSchema.validate(newPassword);
      if (passwordError) {
        res.status(400).json({ message: passwordError.details[0].message });
        return;
      }

      const hashedPassword = await bcryptjs.hash(newPassword, 8);

      await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } }
      );

      res.status(201).json({
        success: true,
        message: "OTP validated. Password Changed",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { refToken } = req.body;
      if (!refToken) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }

      const userId = await Token.verifyRefreshToken(refToken);
      console.log(refToken);
      const accessToken = await Token.signAccessToken(userId);
      const refreshToken = await Token.signRefreshToken(userId);

      res.status(201).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = { authCtrl };
