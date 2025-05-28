const express = require("express");
const {
  getAllNarratives,
  getNarrativeById,
  createNarrative,
  updateNarrative,
  deleteNarrative,
} = require("../controllers/narrativeController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();

const allowAccess = [authenticate, authorize(["HUMAS", "ADMIN"])];

router.get("/", getAllNarratives);
router.get("/:id", getNarrativeById);
router.post("/", allowAccess, createNarrative);
router.put("/:id", allowAccess, updateNarrative);
router.delete("/:id", allowAccess, deleteNarrative);

module.exports = router;
