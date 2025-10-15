const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const Validation = require("../middleware/ValidationHandler");
const {
  registerSchema,
  loginSchema,
  verifyRegisterOtpSchema,
  registerOtpSchema,
} = require("../utils/authValidationSchema");
const {
  sendRegisterOtp,
  verifyRegisterOtp,
} = require("../controller/mailController");
const userRouter = express.Router();

userRouter.post("/register", Validation(registerSchema), registerUser);
userRouter.post("/login", Validation(loginSchema), loginUser);
userRouter.post("/registerOtp", Validation(registerOtpSchema), sendRegisterOtp);
userRouter.post(
  "/verifyRegisterOtp",
  Validation(verifyRegisterOtpSchema),
  verifyRegisterOtp
);

module.exports = userRouter;
