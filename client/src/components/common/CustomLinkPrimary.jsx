import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomLinkPrimary = ({ linkText, url, style }) => {
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
};

export default CustomLinkPrimary;
