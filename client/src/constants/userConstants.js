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
    forms: ["register", "login"],
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
    forms: ["register", "login", "change"],
  },
];

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

export const changePasswordFormFields = userForm
  .filter((elem) => elem.forms.indexOf("change") !== -1)
  .map((obj) => {
    const { forms, ...rest } = obj;
    return rest;
  });

export const Action={
  UPDATE:"update",
  CHANGE_PASSWORD:"change_password"
}