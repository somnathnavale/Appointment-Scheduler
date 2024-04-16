import { Button } from "@mui/material";
import React, { memo } from "react";

const CustomButton = memo((props) => {
  const { btnText, onClick, type, color, variant, style, disabled, id, title,opacity } = props;
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
        opacity:opacity || 1
      }}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {btnText}
    </Button>
  );
});

CustomButton.displayName = "CustomButton";

export default CustomButton;
