import React, { memo, useCallback, useEffect, useState } from "react";
import CustomCalender from "../../../components/common/Calender/CustomCalender";
import { Page, Severity, defaultAsyncInfo } from "../../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import axiosPublic from "../../../config/axios";
import useAxios from "../../../hooks/useAxios";
import { convertAppointmentIntoInstnaces } from "../../../helpers/appointmentsHelper";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import {
  setPageView,
  setSelectedEvent,
} from "../../../features/schedule/scheduleSlice";
import moment from "moment";
import { Endpoints } from "../../../constants/endpoints";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";

const CalenderView = memo(() => {
  const [appointments, setAppointments] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const { user } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.schedule);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  useEffect(() => {
    async function fetchUserAppointments() {
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Fetching user appointments...",
      });
      try {
        const response = await axios.get(
          Endpoints.GET_USER_APPOINTMENTS(user.userId, selectedUser.userId)
        );
        const totalAppointments = convertAppointmentIntoInstnaces([
          ...response.data.commonAppointments,
          ...response.data.otherAppointments,
        ]);
        setAppointments([...totalAppointments]);
        setAsyncInfo(defaultAsyncInfo);
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo({
          ...defaultAsyncInfo,
          message: errObj.message,
          severity: Severity.ERROR,
        });
      }
    }
    if (user?.userId && selectedUser?.userId) fetchUserAppointments();
  }, [axios, user?.userId, selectedUser?.userId]);

  const handleEventSelect = useCallback(
    (selectedEvent) => {
      if (selectedEvent.type == null) {
        return;
      }

      dispatch(setPageView(Page.EVENT));
      dispatch(setSelectedEvent(selectedEvent));
    },
    [dispatch]
  );

  const handleCreateSelect = useCallback(
    (e) => {
      dispatch(setPageView(Page.SCHEDULE));
      dispatch(
        setSelectedEvent({
          date: moment(e.start).format(),
          start: moment(e.start).format("HH:mm"),
          end: moment(e.end).format("HH:mm"),
          appointmentId: -1,
          appointmentInstanceId: -1,
          scheduledWith: selectedUser.userId,
          scheduledBy: user.userId,
        })
      );
    },
    [dispatch, selectedUser, user]
  );

  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo?.severity}
      />
      <CustomCalender
        events={appointments}
        handleEventSelect={handleEventSelect}
        page={Page.SCHEDULE}
        handleCreateSelect={handleCreateSelect}
        disabledCreateAppointment={selectedUser.userId === user.userId}
      />
    </>
  );
});

CalenderView.displayName = "CalenderView";

export default CalenderView;
