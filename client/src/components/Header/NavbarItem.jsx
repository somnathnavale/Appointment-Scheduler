import { Box, ListItem, alpha } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarItem = ({item}) => {
    const navigate=useNavigate();
    const location=useLocation();
    
    function isActiveLink(url) {
      if(location.pathname!=="/"){
        return location.pathname.includes(url) && url!=="/";
      }
      return url===location.pathname;
    }
    
    return (
    <ListItem
      key={item.name}
      onClick={() => {
        navigate(`${item.url}`);
      }}
      sx={{
        cursor:"pointer",
        color: "grey.700",
        position: "relative",
        "&::before": {
          content: `""`,
          position: "absolute",
          left: "0px",
          width: "4px",
          height: "4px",
          border: "2px solid red",
          borderRadius: "50%",
          display: "none",
        },
        "&:hover": {
          background: "none",
          color: "grey.500",
          "::before": {
            display: "inline-block",
            borderColor: "inherit",
          },
        },
        ...(isActiveLink(item.url) && {
          color: "primary.main",
          "::before": {
            display: "inline-block",
            borderColor: "inherit",
          },
          "&:hover": {
            background: "none",
            color: (theme) => alpha(theme.palette.primary.main, 0.75),
            "::before": {
              borderColor: "inherit",
            },
          },
        }),
      }}
    >
      <Box component="span">{item.name} </Box>
    </ListItem>
  );
};

export default NavbarItem;
