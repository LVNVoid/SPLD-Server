const express = require("express");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { getStats } = require("../controllers/statsController");
const router = express.Router();

const allowAccess = [authenticate, authorize(["POLSEK", "HUMAS", "ADMIN"])];

router.get("/", allowAccess, getStats);

module.exports = router;
