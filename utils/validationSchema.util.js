const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "in", "gov", "org", "edu"] },
  })
  .message("Please enter a valid email address"),
  password: Joi.string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{8,}$/
    )
    .message(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
    )
    .required(),
  name: Joi.string()
    .regex(/^[a-zA-Z]{3,}$/)
    .message("Name must be alphabetic and at least 3 characters long")
    .required(),
  number: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .message("Please enter a valid 10-digit Indian mobile number")
    .required(),
});


module.exports = authSchema;

// error Structure 
// {
//   "details": [
//     {
//       "message": "\"email\" must be a valid email",
//       "path": ["email"],
//       "type": "string.email",
//       "context": {
//         // Context specific to the error
//       }
//     },
//     {
//       "message": "Invalid password format",
//       "path": ["password"],
//       "type": "string.pattern.base",
//       "context": {
//         // Context specific to the error
//       }
//     },
//     {
//       "message": "Invalid name format",
//       "path": ["name"],
//       "type": "string.pattern.base",
//       "context": {
//         // Context specific to the error
//       }
//     }
//   ]
// }