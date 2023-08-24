import * as yup from "yup";

export const postValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .min(3, "Title is too short.")
    .max(50, "Title is too long."),
  shortDescription: yup
    .string()
    .required("Description is required.")
    .min(10, "Description is too short.")
    .max(150, "Description is too long."),
  content: yup
    .string()
    .required("Content is required.")
    .min(10, "Content is too short.")
    .max(15000, "Content is too long."),
});
