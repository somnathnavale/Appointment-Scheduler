import { useEffect, useState } from "react";
import axiosPublic from "../config/axios";
import { Endpoints } from "../constants/endpoints";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";
import { ErrorHandler } from "../helpers/asyncHandler";
import { Severity } from "../constants/common";
import { convertAppointmentIntoInstnaces } from "../helpers/appointmentsHelper";

const defaultAsyncInfo = {
  loadingStatus: false,
  loadingMessage: "",
  loadingAction: "",
  message: "",
  status: "",
};

const useAppointmentService = ({ callback, initialData }) => {
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [data, setData] = useState(initialData);

  const { user } = useSelector((store) => store.user);

  const axios = useAxios(axiosPublic);

  useEffect(() => {
    async function fetch() {}
    fetch();
  }, []);

  // const getAllAppointmentOfCurrentUser = async () => {
  //   setAsyncInfo({
  //     ...defaultAsyncInfo,
  //     loadingStatus: true,
  //     loadingMessage: "Fetching User Appointments",
  //   });
  //   const params = {
  //     scheduledBy: user?.userId,
  //     scheduledWith: user?.userId,
  //   };
  //   try {
  //     const response = axios.get(Endpoints.getAllUserAppointments, { params });
  //     const appointments = convertAppointmentIntoInstnaces(
  //       response.data.commonAppointments
  //     );
  //     setData(appointments);
  //     setAsyncInfo({
  //       ...defaultAsyncInfo,
  //       loadingStatus: false,
  //       loadingMessage: "",
  //     });
  //   } catch (error) {
  //     const errObj = ErrorHandler(error);
  //     setAsyncInfo({
  //       ...defaultAsyncInfo,
  //       message: errObj.message,
  //       status: Severity.ERROR,
  //     });
  //   }
  // };

  return { asyncInfo, data };
};

export default useAppointmentService;
