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
