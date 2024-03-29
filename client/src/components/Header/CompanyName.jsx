import { Icon, Stack, Typography } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const CompanyName = memo(() => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
    >
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
});

CompanyName.displayName = "CompanyName";

export default CompanyName;
