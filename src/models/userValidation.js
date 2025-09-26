const joi = require("joi");

// register Validation
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi
      .string()
      .min(6)
      .required()
      .email({tlds: {allow: false}}),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// login Validation

// logout Validation
