import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CustomCalender.css';
import CustomEvent from "./CustomEvent";
import { Box } from "@mui/material";

const CustomDayComponent = ({ date, events }) => {
  // Get the total number of events for the day
  const totalEvents = events.length;
  console.log(date)
  // Render the day component
  return (
    <div className="day">
      <div className="date">{date.getDate()}</div>
      <div className="events">
        {events.map((event) => (
          <div key={event.id} className="event">
            {event.title}
          </div>
        ))}
      </div>
      <div className="total-events">Total events: {totalEvents}</div>
    </div>
  );
};
const CustomCalender = ({events,handleEventSelect}) => {
  const localizer = momentLocalizer(moment);  
  const handleSlotSelect=(slot)=>{
    console.log(slot);
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
      style={{ height: "100%"}}
      min={moment().set({ hour: 9, minute: 0, second: 0 }).format()}
      max={moment().set({ hour: 18, minute: 0, second: 0 }).format()}
      components={{
        
      }}
      onSelectSlot= {handleSlotSelect}  
      //onSelectSlot={(e)=>console.log(e)}
     onSelectEvent={handleEventSelect}
      //onSelecting={(e)=>console.log("selecting ", e)}
    />
  );
};

export default CustomCalender;
