import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const CustomPasswordField = (props) => {
  const { placeHolder, type, name, value, onChange, style, required } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      label={placeHolder}
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
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
};

export default CustomPasswordField;
