const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecotrack_reports",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer middleware
const upload = multer({ storage });

module.exports = upload;
