const multer = require("multer");

// Configure disk storage settings for multer
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: function (req, file, cb) {
    // Concatenate the destination path, including the fieldname and user ID
    cb(null, `./public/data/${file.fieldname}/${req.user.id}`);
  },
  // Define the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and original filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set up multer with the defined storage settings
const upload = multer({ storage: storage });

module.exports = upload;
