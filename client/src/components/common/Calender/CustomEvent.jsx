import { Box, Typography } from "@mui/material";
import React from "react";

const CustomEvent = ({ event }) => {
  return (
    <Box sx={{ px: 1, bgcolor: "primary.main", m: 0 }}>
      <Typography variant="p" sx={{ m: 0 }}>
        {event.title}
      </Typography>
      <br />
      <Typography variant="p">@{event.location}</Typography>
    </Box>
  );
};

export default CustomEvent;
