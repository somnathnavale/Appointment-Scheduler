import React, { memo } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "./Main";
import { Box } from "@mui/material";

const Layout = memo(() => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Main />
      <Footer />
    </Box>
  );
});

Layout.displayName = "Layout";

export default Layout;
