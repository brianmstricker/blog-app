import * as yup from "yup";

export const postValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .min(3, "Title is too short.")
    .max(70, "Title is too long."),
  shortDescription: yup
    .string()
    .required("Description is required.")
    .min(30, "Description is too short.")
    .max(300, "Description is too long."),
  content: yup
    .string()
    .required("Content is required.")
    .min(10, "Content is too short.")
    .max(15000, "Content is too long."),
});
