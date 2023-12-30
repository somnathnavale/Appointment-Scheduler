import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const { placeHolder, type, name, value, onChange, style, required } = props;
  return (
    <TextField
      variant="outlined"
      label={placeHolder}
      type={type ? type : "text"}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        ...style,
      }}
      required={required}
    />
  );
};

export default CustomTextField;
