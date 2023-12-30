import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ btnText, onClick, type, color, variant, style }) => {
  return (
    <Button
      fullWidth
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      type={type ? type : "submit"}
      sx={{
        fontSize: "16px",
        ...style,
      }}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

export default CustomButton;
