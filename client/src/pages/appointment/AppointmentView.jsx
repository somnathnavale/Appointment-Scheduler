import { Alert, Box, Stack, Typography } from "@mui/material";
import React, { Suspense, lazy, memo, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageView,
  setSelectedEvent,
} from "../../features/schedule/scheduleSlice";
import { Page } from "../../constants/common";
import Loading from "../../components/common/Loading";

const UpdateForm = lazy(() => import("./UpdateForm"));

const AppointmentView = () => {
  const [info,setInfo]=useState(true);
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
        mb:2
      }}
    >
      {info && <Alert severity="info" onClose={() => setInfo(false)}>
        Use Instance button for updating current appointment instance, Appointment button will update all instances if it is recurring appointment.  
      </Alert>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          mt:1,
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
          Appointment Details 
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Suspense fallback={<Loading text="Fetching appointment..." />}>
          <UpdateForm />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default AppointmentView;
