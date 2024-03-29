import React, { memo } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const Loading = memo(({ text, style }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "defualt.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        position: "absolute",
        ...style,
      }}
    >
      <CircularProgress />
      <Typography variant="span" mt={2} color="primary.main">
        {text}
      </Typography>
    </Box>
  );
});

Loading.displayName = "Loading";

export default Loading;
