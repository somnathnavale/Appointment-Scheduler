import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { memo, useState } from "react";

const CustomPasswordField = memo((props) => {
  const { label, placeholder, name, value, onChange, style, required, size } =
    props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      size={size || "medium"}
      required={required}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

CustomPasswordField.displayName = "CustomPasswordField";

export default CustomPasswordField;
