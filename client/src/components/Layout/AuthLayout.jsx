import { Box } from "@mui/material";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = memo(() => {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location?.pathname }} />;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Outlet />
    </Box>
  );
});

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
