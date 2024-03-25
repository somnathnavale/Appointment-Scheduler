import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CustomCalender.css";
import { Box, alpha } from "@mui/material";
import CustomAppointment from "./CustomAppointment";
import CustomToolbar from "./CustomToolbar";

const CustomCalender = ({ events, handleEventSelect, page }) => {
  const [zoom, setZoom] = useState(5);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(moment(new Date()));

  const localizer = momentLocalizer(moment);

  const handleSlotSelect = (slot) => {
    console.log(slot);
  };

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM (DD")}-${to.format("DD)")}`;
    }
    if (view === Views.MONTH) {
      return moment(date).format("MMMM YYYY");
    }
  }, [view, date]);

  const onNextClick=useCallback(()=>{
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d"));
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, "w"));
    } else {
      setDate(moment(date).add(1, "M"));
    }
  },[date,view])
  
  const onPrevClick=useCallback(()=>{
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d"));
    } else if (view === Views.WEEK) {
      setDate(moment(date).subtract(1, "w"));
    } else {
      setDate(moment(date).subtract(1, "M"));
    }
  },[date,view])

  const components = {
    event: ({ event }) => {
      if (event)
        return (
          <CustomAppointment
            appointment={event}
            isMonthView={view === Views.MONTH}
          />
        );

      return null;
    },
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        minWidth: "600px",
      }}
    >
      <CustomToolbar
        zoom={zoom}
        setZoom={setZoom}
        view={view}
        onViewChange={(_,val) =>setView(val)}
        date={date}
        onDateChange={date => setDate(date)}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        dateText={dateText}
        page={page}
      />
      <Box
        sx={{
          flexGrow: 1,
          ".rbc-header": {
            bgcolor: "secondary.dark",
          },
          ".rbc-time-header-cell .rbc-today": {
            bgcolor: "primary.main",
          },
          ".rbc-time-slot": {
            color: "secondary.main",
            zIndex: 1,
          },
          ".rbc-time-slot:not(.rbc-today .rbc-time-slot),.rbc-day-bg:not(.rbc-off-range-bg )":
            {
              bgcolor: (theme) => alpha(theme.palette.secondary.lighter, 0.2),
            },
          ".rbc-today .rbc-time-slot, .rbc-today:not(.rbc-off-range-bg,.rbc-time-header-cell):not(.rbc-header)":
            {
              bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.5),
            },
          ".rbc-day-slot .rbc-time-slot": {
            borderColor: (theme) => alpha(theme.palette.primary.light, 0.2),
          },
          ".rbc-event, .rbc-background-event": {
            height: "100%",
            bgcolor: "#fff",
          },
          ".rbc-timeslot-group": {
            minHeight:` ${zoom * 24}px !important`
          }
        }}
      >
        <Calendar
          selectable={true}
          localizer={localizer}
          events={events}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={view}
          view={view}
          date={date}
          startAccessor="start"
          endAccessor="end"
          style={{ flexGrow: 1 }}
          min={moment().set({ hour: 9, minute: 0, second: 0 }).format()}
          max={moment().set({ hour: 18, minute: 0, second: 0 }).format()}
          components={components}
          onView={(v) => setView(v)}
          onNavigate={(...e)=>console.log(e)}
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleEventSelect}
          timeslots={2}
        />
      </Box>
    </Box>
  );
};

export default CustomCalender;
