export const Endpoints = Object.freeze({
  LOGIN: "/api/auth/login",
  REGISTER_USER: "/api/auth/register",
  CHANGE_PASSWORD: (userId) => `/api/auth/${userId}/change-password`,
  UPDATE_USER: (userId) => `/api/users/${userId}`,
  FORGOT_PASSWORD_EMAIL: "/api/auth/forgot-password/email",
  FORGOT_PASSWORD_OTP: "/api/auth/forgot-password/otp",
  FORGOT_PASSWORD_RESET: "/api/auth/forgot-password/reset",
  GET_USER_APPOINTMENTS: (by, withUser) =>
    `/api/appointments/users?scheduled-by=${by}&scheduled-with=${withUser}`,
  CREATE_APPOINTMENT: "/api/appointments/",
  UPDATE_APPOINTMENT: (appId) => `/api/appointments/${appId}`,
  UPDATE_APPOINTMENT_INSTANCE: (appId, instanceId) =>
    `/api/appointments/${appId}/appointment-instance/${instanceId}`,
  DELETE_APPOINTMENT: (appId) => `/api/appointments/${appId}`,
  DELETE_APPOINTMENT_INSTANCE: (appId, instanceId) =>
    `/api/appointments/${appId}/appointment-instance/${instanceId}`,
});
