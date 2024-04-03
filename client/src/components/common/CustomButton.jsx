import { Button } from "@mui/material";
import React, { memo } from "react";

const CustomButton = memo((props) => {
  const { btnText, onClick, type, color, variant, style, disabled, id } = props;
  return (
    <Button
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      type={type ? type : "submit"}
      id={id}
      sx={{
        fontSize: "16px",
        ...style,
        "&.Mui-disabled": {
          color: "text.secondary",
        },
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
});

CustomButton.displayName = "CustomButton";

export default CustomButton;
