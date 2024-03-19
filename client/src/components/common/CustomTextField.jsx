import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const {
    placeHolder,
    type,
    name,
    value,
    onChange,
    style,
    required,
    autoComplete,
    variant,
    InputLabelProps,
    disabled,
  } = props;

  return (
    <TextField
      variant={variant ? variant : "outlined"}
      label={placeHolder}
      type={type ? type : "text"}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      InputLabelProps={InputLabelProps}
    />
  );
};

export default CustomTextField;
