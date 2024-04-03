import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosPublic from "../../config/axios";
import useAxios from "../../hooks/useAxios";
import { Page, Severity, defaultAsyncInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import InnerLayout from "../../components/Layout/InnerLayout";
import CustomCalender from "../../components/common/Calender/CustomCalender";
import { convertAppointmentIntoInstnaces } from "../../helpers/appointmentsHelper";
import { Endpoints } from "../../constants/endpoints";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";

const styles = {
  innerLayout: {
    p: 2,
    pb: "0px !important",
    color: "grey.700",
    height: "100%",
    maxWidth: "100vw",
    overflowX: "auto",
    maxHeight: { xs: "inherit", md: "calc( 100vh - 120px )" },
  },
  snackbar:{
    my:1
  }
};

const MyAppointments = memo(() => {
  const [appointments, setAppointments] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  useEffect(() => {
    async function fetchUserAppointments() {
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Fetching your appointments...",
      });
      try {
        const response = await axios.get(
          Endpoints.GET_USER_APPOINTMENTS(user.userId, user.userId)
        );
        const totalAppointments = convertAppointmentIntoInstnaces(
          response.data.commonAppointments
        );
        setAppointments([...totalAppointments]);
        setAsyncInfo(defaultAsyncInfo);
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo({
          loading: false,
          message: errObj.message,
          severity: Severity.ERROR,
        });
      }
    }
    fetchUserAppointments();
  }, [axios, user?.userId]);

  const handleEventSelect = useCallback((e) => {
    console.log(e);
  }, []);

  const handleSlotSelect = useCallback((e) => {
    console.log(e);
    //write code to dispatch action to set page view and event
  }, []);

  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo?.severity}
        style={styles.snackbar}
      />
      <CustomCalender
        events={appointments}
        handleEventSelect={handleEventSelect}
        page={Page.MY_APPOINTMENT}
        handleSlotSelect={handleSlotSelect}
        disabledCreateAppointment={true}
      />
    </>
  );
});

MyAppointments.displayName = "MyAppointments";

const WrappedMyAppointments = () => {
  return (
    <InnerLayout style={styles.innerLayout} bgcolor="grey.200" height="100%">
      <MyAppointments />
    </InnerLayout>
  );
};

WrappedMyAppointments.displayName = "WrappedMyAppointments";

export default WrappedMyAppointments;
