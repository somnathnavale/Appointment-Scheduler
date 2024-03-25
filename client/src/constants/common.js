export const STATUS =Object.freeze({
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

export const defaultInfo = {
  status: STATUS.IDLE,
  message: "",
};

export const defaultAsyncInfo = {
  loadingStatus: false,
  loadingMessage: "",
  loadingAction: "",
  message: "",
  status: "",
};

export const Page = {
  CALENDER: "calender",
  EVENT: "event",
  SCHEDULE: "schedule",
  MY_APPOINTMENT:"my_appointment"
};

