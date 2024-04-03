import { Box, Stack, Typography } from "@mui/material";
import React, { Suspense, lazy } from "react";
import Loading from "../../../components/common/Loading";
const ScheduleForm = lazy(() => import("./ScheduleForm"));

const Scheduler = () => {
  return (
    <Stack
      sx={{
        p: 2,
        marginTop: 2,
        height: "100%"
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        marginBottom={3}
        sx={{ fontWeight: 500 }}
      >
        Appointment Form
      </Typography>
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Suspense fallback={<Loading text="Loading form..." />}>
          <ScheduleForm />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default Scheduler;
