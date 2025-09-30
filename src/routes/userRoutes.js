const express = require("express");
const {registerUser, loginUser} = require("../controller/userController");

const Validation = require("../middleware/ValidationHandler");
const { registerSchema, loginSchema } = require("../utils/authValidationSchema");
const userRouter = express.Router();

userRouter.post("/register", Validation(registerSchema), registerUser);
userRouter.post("/login", Validation(loginSchema), loginUser);

module.exports = userRouter;
