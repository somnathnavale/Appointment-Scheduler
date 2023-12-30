import {
  AppBar,
  Box,
  IconButton,
  List,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import React, { useState } from "react";

import SidebarDrawer from "./SidebarDrawer";
import CompanyName from "./CompanyName";

import { headerOptions } from "../../utils/constants/navbarConstants";
import NavbarItem from "./NavbarItem";

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <AppBar
        component="nav"
        position="static"
        variant="elevation"
        sx={{
          boxShadow: "none",
          bgcolor: "#fff",
        }}
      >
        <Toolbar
          sx={{
            width: "1180px",
            maxWidth: "100%",
            mx: "auto",
            justifyContent: "space-between",
            color: "secondary.dark",
          }}
        >
          <CompanyName />
          {isMobile ? (
            <List
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                py: 0,
              }}
            >
              {headerOptions.map((item) => {
                return <NavbarItem key={item.name} item={item} />;
              })}
            </List>
          ) : (
            <IconButton edge="start" onClick={handleDrawerToggle}>
              <MenuRoundedIcon sx={{ 
                color:"secondary.dark", 
                height: "32px",
                width: "32px"
               }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <SidebarDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
};

export default Header;
