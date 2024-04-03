export const Endpoints = Object.freeze({
  LOGIN: "/api/auth/login",
  REGISTER_USER: "/api/auth/register",
  CHANGE_PASSWORD:(userId)=>`/api/auth/${userId}/change-password`,
  UPDATE_USER : (userId)=>`/api/users/${userId}`,
  GET_USER_APPOINTMENTS : (by,withUser) => `/api/appointments/users?scheduled-by=${by}&scheduled-with=${withUser}`,
  CREATE_APPOINTMENT : "/api/appointments/",
});
