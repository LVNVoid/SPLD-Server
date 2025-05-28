const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();

const allowAccess = [authenticate, authorize(["ADMIN"])];

router.get("/", allowAccess, getAllUsers);
router.get("/:id", allowAccess, getUserById);
router.post("/", allowAccess, createUser);
router.delete("/:id", allowAccess, deleteUser);

module.exports = router;
