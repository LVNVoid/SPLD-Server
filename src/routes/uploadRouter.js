const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const {
  uploadReportImages,
  uploadNarrativeImages,
} = require("../controllers/uploadController");

router.post(
  "/report/:reportId",
  authenticate,
  upload.array("images", 5),
  uploadReportImages
);

router.post(
  "/narrative/:narrativeId",
  authenticate,
  upload.array("images", 5),
  uploadNarrativeImages
);

module.exports = router;
