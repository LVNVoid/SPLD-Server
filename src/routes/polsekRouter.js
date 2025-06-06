const express = require("express");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  getAllPolsek,
  getPolsekById,
  createPolsek,
  updatePolsek,
  deletePolsek,
} = require("../controllers/polsekController");

const router = express.Router();

const allowAccess = [authenticate, authorize(["ADMIN"])];

router.get("/", authenticate, getAllPolsek);
router.get("/:id", authenticate, getPolsekById);
router.post("/", allowAccess, createPolsek);
router.put("/:id", allowAccess, updatePolsek);
router.delete("/:id", allowAccess, deletePolsek);

module.exports = router;
