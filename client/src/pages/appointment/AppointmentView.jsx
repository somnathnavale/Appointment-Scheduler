import { Box, Button,alpha } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CustomButton from "../../components/common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setPageView, setSelectedEvent } from "../../features/schedule/scheduleSlice";
import { Page } from "../../constants/common";

const AppointmentView = () => {

  const {selectedEvent:appointment} =useSelector((store)=>store.schedule);

  const dispatch=useDispatch();
  const goBack=()=>{
    dispatch(setPageView(Page.CALENDER));
    dispatch(setSelectedEvent(null));
  }

  return (
    <Box>
    <Box sx={{bgcolor:(theme) => alpha(theme.palette.secondary.lighter, 0.25)}}>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <ArrowBackRoundedIcon
          sx={{
            color: "primary.main",
            borderColor: "primary.main",
            cursor: "pointer",
            fontSize: "40px",
            ":hover":{
                opacity:"80%"
            }
          }}
          onClick={goBack}
        />
        <CustomButton
          btnText="Edit Appointment"
          type="secondary"
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
    <Box>
      {JSON.stringify(appointment)}
    </Box>
    </Box>
  );
};

export default AppointmentView;
