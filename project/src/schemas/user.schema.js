import * as yup from "yup";
const registerUserSchema = yup.object().shape({
  fullName: yup.string().required().max(255),
  password: yup.string().required().max(1024).min(8),
  email: yup.string().email().required(),
  birthDate: yup.date().required(),
  gender: yup.string().required().max(255).oneOf(["male", "female", "other"]),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  numTel: yup.string().required().max(8).min(8),
  city: yup.string().required().max(255),
  cin: yup.mixed().required(),
});

const updateUserSchema = yup.object().shape({
  fullName: yup.string().required().max(255),
  gender: yup.string().required().max(255).oneOf(["male", "female", "other"]),
});

const registerCompanySchema = yup.object().shape({
  fullName: yup.string().required().max(50).min(2),
  password: yup.string().required().max(1024).min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup.string().email().required(),
  numTel: yup.string().required().max(8).min(8),
  city: yup.string().required().max(255),
  website: yup.string().url().required(),
  registerCommerce: yup.mixed().required(),
});

const registerExpertSchema = yup.object().shape({
  fullName: yup.string().required().max(255),
  password: yup.string().required().max(1024).min(8),
  email: yup.string().email().required(),
  birthDate: yup.date().required(),
  gender: yup.string().required().max(255).oneOf(["male", "female", "other"]),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  numTel: yup.string().required().max(8).min(8),
  city: yup.string().required().max(255),
  expertise: yup.mixed().required(),
});

const changePassword = yup.object().shape({
  password: yup.string().required().max(1024).min(8),
  newPassword: yup.string().required().max(1024).min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "password doesn't match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const restPasswordSchema = yup.object().shape({
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const sendResetPasswordEmailSchema = yup
  .object()
  .shape({ email: yup.string().email().required() });
export {
  registerUserSchema,
  registerCompanySchema,
  registerExpertSchema,
  loginSchema,
  restPasswordSchema,
  sendResetPasswordEmailSchema,
  updateUserSchema,
  changePassword,
};
