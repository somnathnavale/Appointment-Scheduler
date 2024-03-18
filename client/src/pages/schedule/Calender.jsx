import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import './Calender.css';
import { setSelectedUser } from "../../features/schedule/scheduleSlice";
import AppointmentView from "../appointment/AppointmentView";

const eventData = [
  {
    id: 0,
    title: "Event 1",
    description: "desc 1",
    scheduleBy: "SN011",
    scheduleWith: "JD001",
    type: "InPerson",
    occurence: "OneTime",
    start: moment("2024-03-09T12:00:00").toDate(),
    end: moment("2024-03-09T13:00:00").toDate(),
  },
  {
    id: 1,
    title: "Event 2",
    description: "desc 2",
    scheduleBy: "SN011",
    scheduleWith: "JS002",
    type: "InPerson",
    occurence: "OneTime",
    start: moment("2024-03-05T12:00:00").toDate(),
    end: moment("2024-03-05T13:00:00").toDate(),
  },
  {
    id: 2,
    title: "Event 3",
    description: "desc 3",
    scheduleBy: "JD001",
    scheduleWith: "SN011",
    type: "Online",
    occurence: "OneTime",
    start: moment("2024-03-06T12:00:00").toDate(),
    end: moment("2024-03-06T13:00:00").toDate(),
  },
];

const CustomCalender = () => {
  const { user } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.schedule);

  const [events, setEvents] = useState([]);
  const [selectedEvent,setSelectedEvent]= useState({});

  useEffect(() => {
    if (user?.id && selectedUser) {
      const filteredData = eventData.filter(
        (event) =>
          ((event.scheduleBy === user.id && event.scheduleWith === selectedUser) ||
          (event.scheduleWith === user.id && event.scheduleBy === selectedUser))
      );
      setEvents(filteredData);
    }
  }, [user, selectedUser]);

  const localizer = momentLocalizer(moment);

  const handleSlotSelection = (event) => {
    // do something with it all
    console.log(event);
    setSelectedEvent(event);
    // console.log(end);
    // console.log(action);
  };

  if(Object.keys(selectedEvent).length && selectedEvent.title){
    return <>
      <AppointmentView appointment={selectedEvent}/>
    </>
  }
  

  return (
    <Calendar
      selectable={true}
      localizer={localizer}
      events={events}
      defaultView="month"
      views={["month", "week", "day"]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      min={moment().set({ hour: 9, minute: 0, second: 0 }).format()}
      max={moment().set({ hour: 18, minute: 0, second: 0 }).format()}
      // onSelectSlot= {handleSlotSelection}  
      onSelectSlot={(e)=>console.log(e)}
      onSelectEvent={(e)=>setSelectedEvent(e)}
      onSelecting={(e)=>console.log("selecting ", e)}
    />
  );
};

export default CustomCalender;
