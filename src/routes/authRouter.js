const express = require("express");
const { login, logout, currentUser } = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/login", login);
router.get("/me", authenticate, currentUser);
router.post("/logout", authenticate, logout);

module.exports = router;
