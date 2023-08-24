import * as yup from "yup";

export const userValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .min(3, "Name is too short.")
    .max(50, "Name is too long."),
  username: yup
    .string()
    .required("Username is required.")
    .min(3, "Username is too short.")
    .max(40, "Username is too long."),
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email is required.")
    .min(3, "Email is too short.")
    .max(60, "Email is too long."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password is too short.")
    .max(40, "Password is too long."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});
