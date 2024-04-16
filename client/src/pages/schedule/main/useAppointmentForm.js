import { useCallback, useMemo } from 'react'
import dropdown from "../../../constants/dropdown.json";
import { useSelector } from 'react-redux';

const useAppointmentForm = () => {

    const {selectedEvent} = useSelector(store=>store.schedule);

    const scheduledWithLov = useMemo(
        () => [
          {
            label: selectedEvent?.scheduledWith?.firstname + " " + selectedEvent?.scheduledWith?.lastname,
            value: selectedEvent?.scheduledWith?.userId,
          },
        ],
        [selectedEvent]
      );
    
      const scheduledByLov = useMemo(
        () => [
          {
            label: selectedEvent?.scheduledBy?.firstname + " " + selectedEvent?.scheduledBy?.lastname,
            value: selectedEvent?.scheduledBy?.userId,
          },
        ],
        [selectedEvent]
      );
    
      const remainingFields = useCallback(
        (field) => {
          let dropdownValues = [];
          switch (field) {
            case "type":
              dropdownValues = dropdown.type;
              break;
            case "occurrence":
              dropdownValues = dropdown.occurrence;
              break;
            case "start":
              dropdownValues = dropdown.timeSlots;
              break;
            case "end":
              dropdownValues = dropdown.timeSlots;
              break;
            case "status":
              dropdownValues = dropdown.status;
              break;
            case "scheduledWith":
              dropdownValues = scheduledWithLov;
              break;
            case "scheduledBy":
              dropdownValues = scheduledByLov;
              break;
          }
          return dropdownValues;
        },
        [scheduledByLov, scheduledWithLov]
      );
      
    return {remainingFields};
}

export default useAppointmentForm