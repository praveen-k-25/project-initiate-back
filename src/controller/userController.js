const {asyncHandler} = require("../middleware/ErrorHandler");
const {getCollection} = require("../models/dbModel");
const {registerModel} = require("../models/userModel");
const {VerifyPassword, hashPassword} = require("../utils/Hashing");
const {accessToken, refreshToken} = require("../utils/TokenHandler");

// register user
const registerUser = async (req, res) => {
  const {username, email, password, confirmPassword} = req.body;
  const user = await getCollection(process.env.USER_COLLECTION).findOne({
    email,
  });
  if (user) {
    let error = new Error();
    error.status = 400;
    error.message = "User email already exists";
    throw error;
  }

  if (password !== confirmPassword) {
    let error = new Error();
    error.status = 400;
    error.message = "Password do not match";
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await registerModel(process.env.USER_COLLECTION, {
    username,
    email,
    password: hashedPassword,
  });
  console.log(newUser);
  res.status(200).json({success: true, message: "User registered"});
};

// login user

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await getCollection(process.env.USER_COLLECTION).findOne({
    email,
  });
  if (!user) {
    let error = new Error();
    error.status = 400;
    error.cause = "email";
    error.message = "User not found";
    throw error;
  }
  const isMatch = await VerifyPassword(user.password, password);
  if (!isMatch) {
    let error = new Error();
    error.status = 400;
    error.cause = "password";
    error.message = "Invalid Password";
    throw error;
  }
  res.cookie("accessId", accessToken(user), {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });
  res.cookie("refreshId", refreshToken(user), {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });
  res.status(200).json({
    success: true,
    message: "User logged in Successfully",
    data: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};
