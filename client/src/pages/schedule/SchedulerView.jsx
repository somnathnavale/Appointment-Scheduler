import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CustomCalender from "./Calender";
import UserInfo from "./UserInfo";

const SchedulerView = () => {
  const { selectedUser } = useSelector((store) => store.schedule);

  if (!selectedUser) {
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
    <Box sx={{ height: "100%" }}>
      <UserInfo user={selectedUser}/>
      <Box sx={{height:"90%"}}>
        <CustomCalender />
      </Box>
    </Box>
  );
};

export default SchedulerView;
