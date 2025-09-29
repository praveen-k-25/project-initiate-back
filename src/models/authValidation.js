const yup = require("yup");

// register Validation
const registerValidation = (data) => {
  const schema = yup.object({
    username: yup.string().min(6).required(),
    email: yup
      .string()
      .min(6)
      .required()
      .email({tlds: {allow: false}}), // for specific domain [".com",".net"]
    password: yup.string().min(6).max(16).required(),
    confirmPassword: yup.string().min(6).required().valid(yup.ref("password")),
  });
  return schema.validate(data);
};

// login Validation

const loginValidation = (data) => {
  const schema = yup.object({
    email: yup
      .string()
      .min(6)
      .required()
      .email({tlds: {allow: false}}), // for specific domain [".com",".net"]
    password: yup.string().min(6).max(16).required(),
  });
  return schema.validate(data);
};

module.exports = {registerValidation, loginValidation};
