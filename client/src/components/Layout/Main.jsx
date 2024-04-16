import { Box } from "@mui/material";
import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const Main = memo(() => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Outlet />  
    </Box>
  );
});

Main.displayName = "Main";

export default Main;
