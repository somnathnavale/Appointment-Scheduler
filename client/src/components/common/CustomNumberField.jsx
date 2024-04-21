import { TextField } from "@mui/material";
import React, { memo } from "react";

const CustomNumberField = memo((props) => {
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
    min,
    max,
  } = props;

  const handleKeyDown = (event) => {
    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      /[0-9]/.test(event.key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  };

  return (
    <TextField
      variant={variant ? variant : "outlined"}
      label={label}
      type="number"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      fullWidth
      sx={{
        ...style,
      }}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      InputProps={{ inputProps: { min, max } }}
    />
  );
});

CustomNumberField.displayName = "CustomNumberField";

export default CustomNumberField;
