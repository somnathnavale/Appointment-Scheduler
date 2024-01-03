import { Button } from "@mui/material";
import React from "react";

const CustomButton = (props) => {
  const { btnText, onClick, type, color, variant, style, disabled } = props;
  return (
    <Button
      fullWidth
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      type={type ? type : "submit"}
      sx={{
        fontSize: "16px",
        ...style,
        "&.Mui-disabled": {
          // backgroundColor: disabled ? (color ? color.darker : "primary.darker") : (color ? color.main : "primary.main"),
          color:"text.secondary"
        }
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

export default CustomButton;
