const multer = require("multer");
const { reportStorage, narrativeStorage } = require("../utils/cloudinary");

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadReport = multer({
  storage: reportStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

const uploadNarrative = multer({
  storage: narrativeStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = { uploadReport, uploadNarrative };
