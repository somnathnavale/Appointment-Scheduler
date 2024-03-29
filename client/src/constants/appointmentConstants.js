import dropdown from "./dropdown.json";

const appointmentStatuses = dropdown.appointmentStatus;
const appointmentOccurrences = dropdown.appointmentOccurrence;

export const appointmentForm = [
  {
    name: "date",
    placeholder: "Date",
    label: "Date",
    required: true,
    type: "date",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "startTime",
    placeholder: "Start Time",
    label: "Start Time",
    required: true,
    type: "dropdown",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "endTime",
    placeholder: "End Time",
    label: "End Time",
    required: true,
    type: "dropdown",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "title",
    required: true,
    type: "text",
    defaultValue: "",
    placeholder: "Title",
    label: "Title",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "description",
    required: true,
    type: "longText",
    defaultValue: "",
    placeholder: "Description",
    label: "Description",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "location",
    placeholder: "Location",
    label: "Location",
    required: true,
    type: "text",
    defaultValue: "",
    autoComplete: "off",
    info: " Incase Virtual Meet add Meeting Link",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "appointmentType",
    placeholder: "Appointment Type",
    label: "Appointment Type",
    required: true,
    type: "dropdown",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: true,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "appointmentStatus",
    placeholder: "Appointment Status",
    label: "Appointment Status",
    required: true,
    type: "dropdown",
    defaultValue: appointmentStatuses.find(
      (status) => status.value === "SCHEDULED",
    ).value,
    autoComplete: "off",
    info: "",
    disabled: {
      register: true,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "appointmentOccurrence",
    placeholder: "Appointment Occurrence",
    label: "Appointment Occurrence",
    required: true,
    type: "dropdown",
    defaultValue: appointmentOccurrences.find(
      (status) => status.value === "ONCE",
    ).value,
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: true,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "appointmentInstances",
    placeholder: "Appointment Instances",
    label: "Appointment Instances",
    required: true,
    type: "number",
    defaultValue: null,
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: true,
    },
    max: 30,
    min: 1,
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "scheduledWith",
    placeholder: "Scheduled With",
    label: "Scheduled With",
    required: true,
    type: "dropdown",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: true,
      update: true,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "scheduledBy",
    placeholder: "Scheduled By",
    label: "Scheduled By",
    required: true,
    type: "dropdown",
    defaultValue: "",
    autoComplete: "off",
    info: "",
    disabled: {
      register: true,
      update: true,
    },
    grid: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
    },
    color: "primary",
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
