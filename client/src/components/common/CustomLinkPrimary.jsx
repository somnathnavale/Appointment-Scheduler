import { Typography } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const CustomLinkPrimary = memo((props) => {
  const { linkText, url, style } = props;
  const navigate = useNavigate();

  return (
    <Typography
      variant="span"
      sx={{
        cursor: "pointer",
        color: "primary.main",
        "&:hover": {
          textDecoration: "underline",
        },
        ...style,
      }}
      onClick={() => navigate(url)}
    >
      {linkText}
    </Typography>
  );
});

CustomLinkPrimary.displayName = "CustomLinkPrimary";

export default CustomLinkPrimary;
