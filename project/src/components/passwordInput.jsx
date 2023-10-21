import { useField } from "formik";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const PasswordInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const [show, setShow] = useState(false);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      size="small"
      type={show ? "text" : "password"}
      label={props.placeholder}
      variant="outlined"
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton position="end" onClick={() => setShow(!show)}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default PasswordInput;
