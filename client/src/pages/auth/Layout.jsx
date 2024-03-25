import { Box, Paper, Toolbar } from "@mui/material";
import React from "react";
import CompanyName from "../../components/Header/CompanyName";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Toolbar
        sx={{
          color: "secondary.dark",
        }}
      >
        <CompanyName />
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          dispaly: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "400px",
            maxWidth: "100%",
            margin: "auto",
            p: 4,
            bgcolor: "#fff",
            borderRadius: "10px",
          }}
          elevation={1}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default Layout;
