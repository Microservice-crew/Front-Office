import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

const InputText = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={props.placeholder}
      variant="outlined"
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
      size="small"
    />
  );
};
export default InputText;
