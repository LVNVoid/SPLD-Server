const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { uploadReport, uploadNarrative } = require("../middleware/upload");

const {
  uploadReportImages,
  uploadNarrativeImages,
  deleteNarrativeImage,
} = require("../controllers/uploadController");

router.post(
  "/report/:reportId",
  authenticate,
  uploadReport.array("images", 5),
  uploadReportImages
);

router.post(
  "/narrative/:narrativeId",
  authenticate,
  uploadNarrative.array("images", 5),
  uploadNarrativeImages
);

router.delete("/narrative/image/:imageId", authenticate, deleteNarrativeImage);

module.exports = router;
