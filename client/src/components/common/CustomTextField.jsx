import { TextField } from "@mui/material";
import React, { memo } from "react";

const CustomTextField = memo((props) => {
  const {
    placeholder,
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
    readOnly
  } = props;
  
  return (
    <TextField
      variant={variant ? variant : "outlined"}
      label={label}
      type={type ? type : "text"}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      disabled={disabled}
      inputProps={{ readOnly:readOnly }}
      required={required}
      autoComplete={autoComplete}
    />
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
