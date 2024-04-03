import moment from "moment";
import { Severity } from "../constants/common";
import { registerRequiredFields } from "../constants/appointmentConstants";

export const convertAppointmentIntoInstnaces = (appointments) => {
  const totalAppoitnmetInstances = appointments.reduce((acc, curr) => {
    const { appointmentInstances, ...rest } = curr;

    const instances = appointmentInstances.map((instance) => {
      const { endDateTime, startDateTime, ...others } = instance;
      return {
        ...rest,
        ...others,
        start: moment(startDateTime).toDate(),
        end: moment(endDateTime).toDate(),
      };
    });
    acc.push(...instances);
    return acc;
  }, []);
  return totalAppoitnmetInstances;
};

export const validateScheduleForm = (formData) => {
  const date = formData?.date;
  const currentDay = moment();
  const isPastDate = currentDay.isAfter(date, "day");

  const startTime = moment(formData?.start, "HH:mm");
  const endTime = moment(formData?.end, "HH:mm");

  const startDateTime = startTime.set({
    date: date.date(),
    month: date.month(),
    year: date.year(),
  });

  const endDateTime = endTime.set({
    date: date.date(),
    month: date.month(),
    year: date.year(),
  });

  const isPastTime = currentDay.isAfter(startDateTime, "minute");

  if (isPastDate || isPastTime) {
    return {
      field: "date",
      severity: Severity.WARNING,
      message: "Appointments cannot be scheduled in past",
    };
  }

  if (endTime.isBefore(startTime, "minute")) {
    return {
      field: "start",
      severity: Severity.WARNING,
      message: "start time cannot greater than end time",
    };
  }

  for (let field of registerRequiredFields) {
    const { name, label } = field;
    if (
      !formData[name] ||
      (typeof formData[name] === "object" &&
        Object.keys(formData[name]).length == 0)
    ) {
      return {
        field: name,
        severity: Severity.WARNING,
        message: `${label} is required field`,
      };
    }
  }

  if(formData.scheduledBy === formData.scheduledWith){
    return {
      field: "scheduledWith",
      severity: Severity.WARNING,
      message: `Cannot schedule appointment with yourself`,
    }
  }

  return {
    severity: Severity.SUCCESS,
    data: {
      title: formData.title,
      description: formData.description,
      startDateTime: startDateTime.format("YYYY-MM-DDTHH:mm:ss"),
      endDateTime: endDateTime.format("YYYY-MM-DDTHH:mm:ss"),
      scheduledBy: formData.scheduledBy,
      scheduledWith: formData.scheduledWith,
      type: formData.type,
      status: formData.status,
      instances: formData.instances,
      occurrence: formData.occurrence,
      location: formData.location,
    },
  };
};
