import * as yup from "yup";

const taskValidator = yup.object().shape({
  websiteUrl: yup.string().url(),
  //   ExpireDate: yup.date().required(),
  description: yup.string().required(),
  requirements: yup.array().of(yup.string()).min(1),
  nombre: yup.number().required().min(1).max(30),
  name: yup.string().required(),
});
const taskSearch = yup.object().shape({
  name: yup.string(),
});
export { taskValidator, taskSearch };
