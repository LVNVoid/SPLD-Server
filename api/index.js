const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// Router imports
const reportRouter = require("../src/routes/reportRouter");
const userRouter = require("../src/routes/userRouter");
const narrativeRouter = require("../src/routes/narrativeRouter");
const authRouter = require("../src/routes/authRouter");
const uploadRouter = require("../src/routes/uploadRouter");
const polsekRouter = require("../src/routes/polsekRouter");

// Init
dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/reports", reportRouter);
app.use("/api/polseks", polsekRouter);
app.use("/api/users", userRouter);
app.use("/api/narratives", narrativeRouter);
app.use("/api/auth", authRouter);

// Export handler
module.exports = app;
