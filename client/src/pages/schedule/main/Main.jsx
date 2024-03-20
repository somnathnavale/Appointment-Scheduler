import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import CustomCalender from "../../../components/common/Calender/CustomCalender";
import CalenderView from "./CalenderView";
import { Page } from "../../../constants/common";
import AppointmentView from "../../appointment/AppointmentView";
import ScheduleForm from "./ScheduleForm";

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
        <Box sx={{ height: "100%", bgcolor: "fff" }}>
          <UserInfo />
          <Box sx={{ height: "90%", p: 1, bgcolor: "#fff" }}>
            <CalenderView />
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
