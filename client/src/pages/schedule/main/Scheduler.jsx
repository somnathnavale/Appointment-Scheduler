import { Box, Stack, Typography } from "@mui/material";
import React, { Suspense, lazy } from "react";
import Loading from "../../../components/common/Loading";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch } from "react-redux";
import {
  setPageView,
  setSelectedEvent,
} from "../../../features/schedule/scheduleSlice";
import { Page } from "../../../constants/common";

const ScheduleForm = lazy(() => import("./ScheduleForm"));

const Scheduler = () => {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setPageView(Page.CALENDER));
    dispatch(setSelectedEvent(null));
  };

  return (
    <Stack
      sx={{
        px: 2,
        height: "100%",
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          color: "secondary.dark",
        }}
      >
        <ArrowBackRoundedIcon
          sx={{
            cursor: "pointer",
            fontSize: "40px",
            ":hover": {
              opacity: "80%",
            },
          }}
          onClick={goBack}
        />
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontWeight: 500, flexGrow: 1, alignSelf: "baseline" }}
        >
          Appointment Form
        </Typography>
      </Box>
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
