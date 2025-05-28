const express = require("express");
const {
  getAllReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();

const allowAccess = [authenticate, authorize(["POLSEK", "ADMIN"])];

router.get("/", authenticate, getAllReports);
router.get("/:id", authenticate, getReportById);
router.post("/", allowAccess, createReport);
router.put("/:id", allowAccess, updateReport);
router.delete("/:id", allowAccess, deleteReport);

module.exports = router;
