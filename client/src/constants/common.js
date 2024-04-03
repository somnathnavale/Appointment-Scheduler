export const Severity = Object.freeze({
  INFO:"info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  NONE:""
});

export const defaultAsyncInfo = {
  loading: false,
  message: "",
  action: "",
  severity: Severity.NONE
};

export const Page = {
  CALENDER: "calender",
  EVENT: "event",
  SCHEDULE: "schedule",
  MY_APPOINTMENT: "my_appointment",
};
