import { Severity } from "../constants/common";

export const ErrorHandler = (error) => {
  if (error?.isAxiosError) {
    if (error.response) {
      const { message, status } = error.response.data;
      const statusCode = error.response.status;
      return { message, status: status, statusCode };
    } else if (error.request) {
      return {
        message: error?.message || "Network Error",
        status: Severity.ERROR,
        statusCode: 0,
      };
    } else {
      return {
        message: error?.message || "Unknown Error",
        status: Severity.ERROR,
        statusCode: 500,
      };
    }
  }

  return {
    message: "Something went wrong",
    status: Severity.ERROR,
    statusCode: 500,
  };
};

export const asyncHandler = (fn) => {
  return async (data) => {
    try {
      return await fn(data);
    } catch (error) {
      const errObj = ErrorHandler(error);
      return errObj;
    }
  };
};
