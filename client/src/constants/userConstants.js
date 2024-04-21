import { defaultAsyncInfo } from "./common";

export const userForm = [
  {
    name: "firstname",
    placeholder: "",
    label: "Firstname",
    required: true,
    type: "text",
    autoComplete: "off",
    info: "",
    defaultValue: "",
    forms: ["register", "update"],
  },
  {
    name: "lastname",
    placeholder: "",
    label: "Lastname",
    required: true,
    type: "text",
    autoComplete: "off",
    info: "",
    defaultValue: "",
    forms: ["register", "update"],
  },
  {
    name: "email",
    placeholder: "email address",
    label: "Email",
    required: true,
    type: "email",
    autoComplete: "off",
    info: "",
    defaultValue: "",
    forms: ["register", "login", "forgot"],
  },
  {
    name: "password",
    placeholder: "",
    label: "Password",
    required: true,
    type: "password",
    autoComplete: "off",
    info: "",
    defaultValue: "",
    forms: ["register", "login", "change", "forgot"],
  },
  {
    name: "confirmPassword",
    placeholder: "",
    label: "Confirm Password",
    required: true,
    type: "password",
    autoComplete: "off",
    info: "",
    defaultValue: "",
    forms: ["forgot"],
  },
  {
    name: "otp",
    placeholder: "",
    label: "OTP",
    required: true,
    type: "number",
    autoComplete: "off",
    info: "",
    max: 999999,
    min: 100000,
    defaultValue: "",
    forms: ["forgot"],
  },
];

// register
export const defaultRegisterUserForm = userForm
  .filter((elem) => elem.forms.indexOf("register") !== -1)
  .reduce((acc, curr) => {
    acc[curr.name] = curr.defaultValue;
    return acc;
  }, {});

export const registerFormFields = userForm
  .filter((elem) => elem.forms.indexOf("register") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

// login
export const defaultLoginUserForm = userForm
  .filter((elem) => elem.forms.indexOf("login") !== -1)
  .reduce((acc, curr) => {
    acc[curr.name] = curr.defaultValue;
    return acc;
  }, {});

export const loginFormFields = userForm
  .filter((elem) => elem.forms.indexOf("login") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

// update
export const defaultUpdateUserForm = userForm
  .filter((elem) => elem.forms.indexOf("update") !== -1)
  .reduce((acc, curr) => {
    acc[curr.name] = curr.defaultValue;
    return acc;
  }, {});

export const updateUserFormFields = userForm
  .filter((elem) => elem.forms.indexOf("update") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

//change password
export const changePasswordFormFields = userForm
  .filter((elem) => elem.forms.indexOf("change") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

//forgot password
export const forgotPasswordFormFields = userForm
  .filter((elem) => elem.forms.indexOf("forgot") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

export const defaultForgotPasswordForm = userForm
  .filter((elem) => elem.forms.indexOf("forgot") !== -1)
  .reduce((acc, curr) => {
    acc[curr.name] = curr.defaultValue;
    return acc;
  }, {});

export const Action = {
  UPDATE: "update",
  CHANGE_PASSWORD: "change_password",
};

// forgot password screen constants
export const ForPassStage = {
  USERNAME: "username",
  OTP: "otp",
  PASSWORD: "password",
};

export const ForPassStageFields = {
  [ForPassStage.USERNAME]: ["email"],
  [ForPassStage.OTP]: ["otp"],
  [ForPassStage.PASSWORD]: ["password", "confirmPassword"],
};
