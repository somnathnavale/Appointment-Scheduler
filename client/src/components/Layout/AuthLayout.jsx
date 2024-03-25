import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = ({ children }) => {
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
};

export default AuthLayout;
