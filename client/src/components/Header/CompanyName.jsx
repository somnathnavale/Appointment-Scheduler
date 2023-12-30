import { Icon, Stack, Typography } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import React from "react";

const CompanyName = () => {
  return (
    <Stack direction="row">
      <Icon
        sx={{
          mr: 0.5,
          color: "secondary.dark",
          height: "32px",
          width: "32px",
        }}
      >
        <EventAvailableRoundedIcon
          sx={{
            color: "secondary.dark",
            height: "32px",
            width: "32px",
          }}
        />
      </Icon>
      <Typography variant="h4">Calendify</Typography>
    </Stack>
  );
};

export default CompanyName;
