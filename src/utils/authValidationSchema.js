const yup = require("yup");

// register Validation
const registerSchema = yup.object({
  username: yup.string().min(6).required(),
  email: yup
    .string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }), // for specific domain [".com",".net"]
  password: yup.string().min(6).max(20).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  otp: yup.number().required(),
});

// login Validation
const loginSchema = yup.object({
  email: yup
    .string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }), // for specific domain [".com",".net"]
  password: yup.string().min(6).max(20).required(),
});

const otpSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address")
    .required("email is required")
    .email("email is invalid"),
});

const verifyRegisterOtpSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address")
    .required("email is required")
    .email("email is invalid"),
  otp: yup.number().required(),
});

const verifyForgotPasswordOtpSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address")
    .required("email is required")
    .email("email is invalid"),
  otp: yup.number().required(),
  newPassword: yup.string().min(6).max(20).required(),
});
module.exports = {
  registerSchema,
  loginSchema,
  otpSchema,
  verifyRegisterOtpSchema,
  verifyForgotPasswordOtpSchema,
};
