import React, { memo, useCallback, useEffect, useState } from "react";
import CustomCalender from "../../../components/common/Calender/CustomCalender";
import { Page, STATUS, defaultAsyncInfo } from "../../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import axiosPublic from "../../../config/axios";
import useAxios from "../../../hooks/useAxios";
import { convertAppointmentIntoInstnaces } from "../../../helpers/appointmentsHelper";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import {
  setPageView,
  setSelectedEvent,
} from "../../../features/schedule/scheduleSlice";

const CalenderView = memo(() => {
  const [appointments, setAppointments] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const { user } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.schedule);

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
          `/api/appointments/users?scheduled-by=${user.userId}&scheduled-with=${selectedUser.userId}`,
        );
        const totalAppointments = convertAppointmentIntoInstnaces([
          ...response.data.commonAppointments,
          ...response.data.otherAppointments,
        ]);
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
  }, [axios, user?.userId, selectedUser?.userId]);

  const handleEventSelect = useCallback(
    (selectedEvent) => {
      if (selectedEvent.type == null) {
        return;
      }
      dispatch(setPageView(Page.EVENT));
      dispatch(setSelectedEvent(selectedEvent));
    },
    [dispatch],
  );

  return (
    <>
      <CustomCalender
        events={appointments}
        handleEventSelect={handleEventSelect}
        page={Page.SCHEDULE}
      />
    </>
  );
});

CalenderView.displayName = "CalenderView";

export default CalenderView;
