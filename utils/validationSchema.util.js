const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,  // example --> example@gmail.com----> gmail ( first-level domain) 
    tlds: { allow: ["com", "net", "in", "gov", "org", "edu"] },   // tlds ---> top level domain (com, org)
  })
  .message("Please enter a valid email address"), // custom message 
  password: Joi.string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{8,}$/
    )  // 1 lowercase , 1 uppercase, 1 number , 1 special characters 
    .message(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
    )
    .required(),
  name: Joi.string().required(),
  number: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .message("Please enter a valid 10-digit Indian mobile number")
    .required(),
});


module.exports = authSchema;

// error structure 

// [Error [ValidationError]: Please enter a valid email address. Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long. Name must be alphabetic and at least 3 characters long. Please enter a valid 10-digit Indian mobile number] {
//   _original: {
//     email: 'e@gmailom',
//     password: 'Rcii2',
//     name: 'Ri',
//     number: '9430071'
//   },
//   details: [
//     {
//       message: 'Please enter a valid email address',
//       path: [Array],
//       type: 'string.email',
//       context: [Object]
//     },
//     {
//       message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long',        
//       path: [Array],
//       type: 'string.pattern.base',
//       context: [Object]
//     },
//     {
//       message: 'Name must be alphabetic and at least 3 characters long',
//       path: [Array],
//       type: 'string.pattern.base',
//       context: [Object]
//     },
//     {
//       message: 'Please enter a valid 10-digit Indian mobile number',
//       path: [Array],
//       type: 'string.pattern.base',
//       context: [Object]
//     }
//   ]
// }