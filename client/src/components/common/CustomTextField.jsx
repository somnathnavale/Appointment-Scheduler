import { TextField } from "@mui/material";
import React, { memo } from "react";

const CustomTextField = memo((props) => {
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
    label,
    disabled,
  } = props;

  return (
    <TextField
      variant={variant ? variant : "outlined"}
      label={label}
      type={type ? type : "text"}
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
    />
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
