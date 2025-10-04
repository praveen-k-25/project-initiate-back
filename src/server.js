require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connectDB} = require("./database/db");
const {globalErrorHandler} = require("./middleware/ErrorHandler");
const userRouter = require("./routes/userRoutes");
const app = express();

// connect to database
connectDB();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://1d2103g4-5173.inc1.devtunnels.ms",
      "https://project-initiate.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/user", userRouter);

// captures all errors
app.use(globalErrorHandler);

// catch unhandled promise rejections
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// server listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
