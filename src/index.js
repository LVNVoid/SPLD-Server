const express = require("express");
const dotenv = require("dotenv");
const reportRouter = require("./routes/reportRouter");
const userRouter = require("./routes/userRouter");
const narrativeRouter = require("./routes/narrativeRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/reports", reportRouter);
app.use("/api/users", userRouter);
app.use("/api/narratives", narrativeRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🚀`);
});
