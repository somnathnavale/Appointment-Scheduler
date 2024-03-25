import dropdown from "./dropdown.json";

const appointmentStatuses = dropdown.appointmentStatus;
const appointmentOccurrences = dropdown.appointmentOccurrence;

export const appointmentForm = [
  {
    name: "date",
    placeHolder: "Date",
    info: "",
    required: true,
    type: "date",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "startTime",
    placeHolder: "Start Time",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "endTime",
    placeHolder: "End Time",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "title",
    placeHolder: "Title",
    required: true,
    type: "text",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "description",
    placeHolder: "Description",
    required: true,
    type: "longText",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "location",
    placeHolder: "Location",
    info: " Incase Virtual Meet add Meeting Link",
    required: true,
    type: "text",
    defaultValue: "",
    disabled: {
      register: false,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "appointmentType",
    placeHolder: "Appointment Type",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: "",
    disabled: {
      register: false,
      update: true,
    },
    forms: ["register", "update"],
  },
  {
    name: "appointmentStatus",
    placeHolder: "Appointment Status",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: appointmentStatuses.find(
      (status) => status.value === "SCHEDULED"
    ).value,
    disabled: {
      register: true,
      update: false,
    },
    forms: ["register", "update"],
  },
  {
    name: "appointmentOccurrence",
    placeHolder: "Appointment Occurrence",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: appointmentOccurrences.find(
      (status) => status.value === "ONCE"
    ).value,
    disabled: {
      register: false,
      update: true,
    },
    forms: ["register", "update"],
  },
  {
    name: "appointmentInstances",
    placeHolder: "Appointment Instances",
    info: "",
    required: true,
    type: "number",
    defaultValue: null,
    disabled: {
      register: false,
      update: true,
    },
    max: 30,
    min: 1,
    forms: ["register", "update"],
  },
  {
    name: "scheduledWith",
    placeHolder: "Scheduled With",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: "",
    disabled: {
      register: true,
      update: true,
    },
    forms: ["register", "update"],
  },
  {
    name: "scheduledBy",
    placeHolder: "Scheduled By",
    info: "",
    required: true,
    type: "dropdown",
    defaultValue: "",
    disabled: {
      register: true,
      update: true,
    },
    forms: ["register", "update"],
  },
];

export const defaultAppointmentForm = appointmentForm.reduce((acc, curr) => {
  acc[curr.name] = curr.defaultValue;
  return acc;
}, {});

export const registerAppointmentFields = appointmentForm.map((field) => {
  const { disabled, forms, ...rest } = field;
  return {
    ...rest,
    disabled: disabled.register,
  };
});

export const updateAppointmentFields = appointmentForm.map((field) => {
  const { disabled, forms, ...rest } = field;
  return {
    ...rest,
    disabled: disabled.update,
  };
});
