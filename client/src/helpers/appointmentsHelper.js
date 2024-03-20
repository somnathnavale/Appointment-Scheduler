import moment from "moment";

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