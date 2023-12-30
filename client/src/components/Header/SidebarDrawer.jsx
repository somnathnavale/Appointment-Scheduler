import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  alpha,
} from "@mui/material";
import React from "react";
import CompanyName from "./CompanyName";
import { headerOptions } from "../../utils/constants/navbarConstants";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarDrawer = ({ open, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function isActiveLink(url) {
    return location.pathname.includes(url);
  }

  return (
    <nav>
      <Drawer
        container={document.getElementById("root")}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "240px",
            bgcolor: "grey.200",
          },
        }}
      >
        <Toolbar sx={{ color: "secondary.dark" }}>
          <CompanyName />
        </Toolbar>
        <List>
          {headerOptions.map(({ name, url }) => (
            <ListItemButton
              key={name}
              sx={{
                minHeight: "44px",
                cursor: "pointer",
                borderRadius: 0.75,
                typography: "body1",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                ...(isActiveLink(url) && {
                  color: "primary.main",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }),
              }}
              onClick={() => navigate(url)}
            >
              <Box component="span">{name} </Box>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </nav>
  );
};

export default SidebarDrawer;
