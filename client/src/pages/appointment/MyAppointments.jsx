import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosPublic from "../../config/axios";
import useAxios from "../../hooks/useAxios";
import { Page, STATUS, defaultAsyncInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import { Box } from "@mui/material";
import InnerLayout from "../../components/Layout/InnerLayout";
import CustomCalender from "../../components/common/Calender/CustomCalender";
import { convertAppointmentIntoInstnaces } from "../../helpers/appointmentsHelper";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [events, setEvents] = useState();

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  useEffect(() => {
    async function fetchUserAppointments() {
      setAsyncInfo((prev) => ({
        ...prev,
        loadingStatus: true,
        loadingMessage: "Fetching User Appointments",
      }));
      try {
        const response = await axios.get(
          `/api/appointments/users?scheduled-by=${user.userId}&scheduled-with=${user.userId}`,
        );
        const totalAppointments = convertAppointmentIntoInstnaces(
          response.data.commonAppointments,
        );
        setAppointments([...totalAppointments]);
        setAsyncInfo({
          ...defaultAsyncInfo,
          loadingStatus: false,
          loadingMessage: "",
        });
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo((prev) => ({
          ...prev,
          loadingStatus: false,
          loadingMessage: "",
          message: errObj.message,
          status: STATUS.ERROR,
        }));
      }
    }
    fetchUserAppointments();
  }, [axios, user?.userId]);

  function handleEventSelect(e) {
    console.log(e);
  }

  const handleSlotSelect = useCallback((e) => {
    console.log(e);
    //write code to dispatch action to set page view and event
  }, []);

  return (
    <Box sx={{ height: "100%", bgcolor: "grey.200" }}>
      <InnerLayout
        style={{
          p: 2,
          pb: "0px !important",
          color: "grey.700",
          height: "100%",
          maxWidth: "100vw",
          overflowX: "auto",
          maxHeight: { xs: "inherit", md: "calc( 100vh - 120px )" },
        }}
        height="100%"
      >
        <CustomCalender
          events={appointments}
          handleEventSelect={handleEventSelect}
          page={Page.MY_APPOINTMENT}
          handleSlotSelect={handleSlotSelect}
        />
      </InnerLayout>
    </Box>
  );
};

export default MyAppointments;
