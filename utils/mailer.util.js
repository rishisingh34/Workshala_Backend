const mailer = require('nodemailer');
require('dotenv').config();

const sendmail = async ( email , verificationLink , subject ) => {
    const transporter = mailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        secure : true, 
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASS
        }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `<p style="font-size: 16px;"> Hi there ,</p>
      <p style="font-size: 16px;>Thank you for using our service. To verify your identity, we have sent you a 
       an Email Verification Link.
      </p>
      
      <p style="font-size: 16px;>If you did not request this , please ignore this email.Thank you for 
       choosing our service.
      </p>
      <a href="${verificationLink}">Click This link for Email Verification</a>
      <p style="font-size: 16px;>Best regards,</p>
      <p style="font-size: 16px;>Team WorkShala</p> `,
    };
    transporter.sendMail( mailOptions, (err, info ) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Email Sent : " + info.response);
        }
    });
};

const sendOtpMail = async (email, otp, subject) => {
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: `<p style="font-size: 16px;"> Hi there ,</p>
      <p style="font-size: 16px;>Thank you for using our service. To verify your identity, we have sent you a 
       an OTP.
      </p>
      
      <p style="font-size: 16px;>If you did not request this , please ignore this email.Thank you for 
       choosing our service.
      </p>
      <p>Your OTP is ${otp}</p>
      <p style="font-size: 16px;>Best regards,</p>
      <p style="font-size: 16px;>Team WorkShala</p> `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent : " + info.response);
    }
  });
};

module.exports = {sendmail, sendOtpMail}; 