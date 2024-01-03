import { Box } from "@mui/material";
import React from "react";

const Layout = ({children,bgcolor,style}) => {
  return (
    <Box
      sx={{
        bgcolor: bgcolor,
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
          ...style
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
