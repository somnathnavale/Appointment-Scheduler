import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: {
          xs: "16px",
        },
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Main;
