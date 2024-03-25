import { Box } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import { Page } from "../../../constants/common";
import AppointmentView from "../../appointment/AppointmentView";
import ScheduleForm from "./ScheduleForm";
import Loading from "../../../components/common/Loading";

const CalenderView = lazy(() => import("./CalenderView"));

const Main = () => {
  const { selectedUser, pageView } = useSelector((store) => store.schedule);

  if (!selectedUser?.userId) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        select a user to schedule or view appointments
      </Box>
    );
  }
  return (
    <Box sx={{ height: "100%", bgcolor: "fff" }}>
      {pageView === Page.CALENDER ? (
        <Box
          sx={{
            height: "100%",
            bgcolor: "fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{}}>
            <UserInfo selectedUser={selectedUser} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#fff",
              maxWidth: "100vw",
              overflowX: "auto",
              position: "relative",
            }}
          >
            <Suspense fallback={<Loading text="fetching user appointments" />}>
              <Box
                sx={{
                  p: 1,
                  height: "100%",
                }}
              >
                <CalenderView />
              </Box>
            </Suspense>
          </Box>
        </Box>
      ) : pageView === Page.EVENT ? (
        <AppointmentView />
      ) : (
        <ScheduleForm />
      )}
    </Box>
  );
};

export default Main;
