import React from "react";
import { Box } from "@mui/material";

const InnerLayout = ({ children, bgcolor, style, height }) => {
  return (
    <Box
      sx={{
        bgcolor: bgcolor,
        height: height ?? "auto",
      }}
    >
      <Box
        sx={{
          width: "1180px",
          maxWidth: "100%",
          mx: "auto",
          justifyContent: "space-between",
          color: "secondary.main",
          px: {
            xs: 2,
            sm: 3,
          },
          pb: 4,
          ...style,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default InnerLayout;
