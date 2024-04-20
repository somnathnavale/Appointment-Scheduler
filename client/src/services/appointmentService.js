import { Severity, defaultAsyncInfo } from "../constants/common";
import { Endpoints } from "../constants/endpoints";
import { convertAppointmentIntoInstances } from "../helpers/appointmentsHelper";
import { ErrorHandler } from "../helpers/asyncHandler";

export const getAllAppointmentOfCurrentUser = async function (...args) {
  return async function (setData, setAsyncInfo, axios, ...args) {
    setAsyncInfo({
      ...defaultAsyncInfo,
      loadingStatus: true,
      loadingMessage: "Fetching User Appointments",
    });
    try {
      const response = axios.get(Endpoints.GET_USER_APPOINTMENTS, {
        params: args.params,
      });
      const appointments = convertAppointmentIntoInstances(
        response.data.commonAppointments,
      );
      setData(appointments);
      setAsyncInfo({
        ...defaultAsyncInfo,
        loadingStatus: false,
        loadingMessage: "",
      });
    } catch (error) {
      const errObj = ErrorHandler(error);
      setAsyncInfo({
        ...defaultAsyncInfo,
        message: errObj.message,
        status: Severity.ERROR,
      });
    }
  };
};
