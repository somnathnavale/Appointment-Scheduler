import moment from "moment";
import dropdown from "./dropdown.json";

const appointmentStatuses = dropdown.status;
const appointmentOccurrences = dropdown.occurrence;

export const appointmentForm = [
  {
    name: "title",
    required: true,
    type: "text",
    defaultValue: "",
    placeholder: "Title",
    label: "Title",
    autoComplete:"off",
    info:"",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 12,
      md: 8,
      lg: 8,
    },
    color: "primary",
    forms: ["register", "update"],
  },
  {
    name: "date",
    placeholder: "Date",
    label: "Date",
    required: true,
    type: "date",
    defaultValue: moment(new Date()),
    info: "",
    size:"medium",
    disablePast:true,
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
    name: "start",
    placeholder: "Start Time",
    label: "Start Time",
    required: true,
    type: "dropdown",
    lovKey:"timeSlots",
    defaultValue: "",
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
    name: "end",
    placeholder: "End Time",
    label: "End Time",
    required: true,
    type: "dropdown",
    lovKey:"timeSlots",
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
    name: "type",
    placeholder: "Appointment Type",
    label: "Appointment Type",
    required: true,
    type: "dropdown",
    lovKey:"type",
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
    name: "status",
    placeholder: "Appointment Status",
    label: "Appointment Status",
    required: true,
    type: "dropdown",
    lovKey:"status",
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
    name: "occurrence",
    placeholder: "Appointment Occurrence",
    label: "Appointment Occurrence",
    required: true,
    type: "dropdown",
    lovKey:"occurrence",
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
    name: "instances",
    placeholder: "Appointment Instances",
    label: "Appointment Instances",
    required: true,
    type: "number",
    defaultValue: 1,
    autoComplete: "off",
    info: "",
    disabled: {
      register: false,
      update: false,
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
    forms: ["register"],
  },
  {
    name: "scheduledWith",
    placeholder: "Scheduled With",
    label: "Scheduled With",
    required: true,
    type: "dropdown",
    lovKey:"scheduledWith",
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
    lovKey:"scheduledBy",
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
    name: "description",
    required: true,
    type: "textarea",
    defaultValue: "",
    placeholder: "Description",
    label: "Description",
    autoComplete:"off",
    info:"",
    disabled: {
      register: false,
      update: false,
    },
    grid: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
    rows:2,
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
    readOnly: disabled.register,
  };
});

export const registerRequiredFields = registerAppointmentFields.map(field=>({name:field.name,label:field.label}));

export const updateAppointmentFields = appointmentForm.filter(field=>field.forms.indexOf("update")!==-1).map((field) => {
  const { disabled, forms, ...rest } = field;
  return {
    ...rest,
    readOnly: disabled.update,
  };
});

export const Actions={
  APPOINTMENT:"appointment",
  INSTANCE:"instance"
}

export const readOnlyFields ={
  [Actions.APPOINTMENT] :["scheduledWith","scheduledBy","occurrence"],
  [Actions.INSTANCE] : ["title","description","type","location","scheduledWith","scheduledBy","occurrence"],
}