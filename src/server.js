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
app.use(cors());
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
