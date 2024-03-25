import { STATUS, defaultAsyncInfo } from "../constants/common";
import { ENDPOINTS } from "../constants/endpoints";
import { convertAppointmentIntoInstnaces } from "../helpers/appointmentsHelper";
import { ErrorHandler } from "../helpers/asyncHandler";

export const getAllAppointmentOfCurrentUser = async function (...args) {
  return async function (setData, setAsyncInfo, axios, ...args) {
    setAsyncInfo({
      ...defaultAsyncInfo,
      loadingStatus: true,
      loadingMessage: "Fetching User Appointments",
    });
    try {
      const response = axios.get(ENDPOINTS.getAllUserAppointments, {
        params: args.params,
      });
      const appointments = convertAppointmentIntoInstnaces(
        response.data.commonAppointments
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
        status: STATUS.ERROR,
      });
    }
  };
};
