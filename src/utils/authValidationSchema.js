const yup = require("yup");

// register Validation
const registerSchema = yup.object({
  username: yup.string().min(6).required(),
  email: yup
    .string()
    .min(6)
    .required()
    .email({tlds: {allow: false}}), // for specific domain [".com",".net"]
  password: yup.string().min(6).max(16).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// login Validation

const loginSchema = yup.object({
  email: yup
    .string()
    .min(6)
    .required()
    .email({tlds: {allow: false}}), // for specific domain [".com",".net"]
  password: yup.string().min(6).max(16).required(),
});

module.exports = {registerSchema, loginSchema};
