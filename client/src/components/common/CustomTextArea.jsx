import { TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { memo } from "react";

const CustomTextArea = memo((props) => {
  const {
    placeholder,
    name,
    value,
    onChange,
    style,
    required,
    autoComplete,
    variant,
    label,
    disabled,
    rows
  } = props;

  return (
    <TextField
      variant={variant ? variant : "outlined"}
      label={label}
      type={"text"}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      rows={rows}
      multiline
    />
  );
});

CustomTextArea.displayName = "CustomTextArea";

export default CustomTextArea;
