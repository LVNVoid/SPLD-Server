const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const reportRouter = require("./routes/reportRouter");
const userRouter = require("./routes/userRouter");
const narrativeRouter = require("./routes/narrativeRouter");
const authRouter = require("./routes/authRouter");
const uploadRouter = require("./routes/uploadRouter");
const polsekRouter = require("./routes/polsekRouter");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/upload", uploadRouter);
app.use("/api/reports", reportRouter);
app.use("/api/polseks", polsekRouter);
app.use("/api/users", userRouter);
app.use("/api/narratives", narrativeRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🚀`);
});
