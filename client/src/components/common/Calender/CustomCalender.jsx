import React, { memo, useCallback, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CustomCalender.css";
import { Box, alpha } from "@mui/material";
import CustomAppointment from "./CustomAppointment";
import CustomToolbar from "./CustomToolbar";
import { defaultContextMenu } from "../../../constants/calenderConstants";
import CustomMenuCalender from "./CustomMenuCalender";

const CustomCalender = memo(
  ({ events, handleEventSelect, page, handleCreateSelect }) => {
    const [zoom, setZoom] = useState(5);
    const [view, setView] = useState(Views.WEEK);
    const [date, setDate] = useState(moment(new Date()));
    const [contextMenuInfo, setContextMenuInfo] = useState(defaultContextMenu);

    const localizer = momentLocalizer(moment);

    const handleSlotSelect = useCallback(
      (e) => {
        if (view === Views.MONTH) return;
        setContextMenuInfo({
          xPosition: e.box.x,
          yPosition: e.box.y,
          start: e.start,
          end: e.end,
          resourceId: e.resourceId,
        });
      },
      [view],
    );

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

    const onNextClick = useCallback(() => {
      if (view === Views.DAY) {
        setDate(moment(date).add(1, "d"));
      } else if (view === Views.WEEK) {
        setDate(moment(date).add(1, "w"));
      } else {
        setDate(moment(date).add(1, "M"));
      }
    }, [date, view]);

    const onPrevClick = useCallback(() => {
      if (view === Views.DAY) {
        setDate(moment(date).subtract(1, "d"));
      } else if (view === Views.WEEK) {
        setDate(moment(date).subtract(1, "w"));
      } else {
        setDate(moment(date).subtract(1, "M"));
      }
    }, [date, view]);

    const changeZoom = useCallback((val) => setZoom(val), []);

    const onViewChange = useCallback((_, val) => setView(val), []);

    const onDateChange = useCallback((date) => setDate(date), []);

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
        <CustomMenuCalender
          contextMenuInfo={contextMenuInfo}
          handleCreateSelect={handleCreateSelect}
          setContextMenuInfo={setContextMenuInfo}
        />
        <CustomToolbar
          zoom={zoom}
          changeZoom={changeZoom}
          view={view}
          onViewChange={onViewChange}
          date={date}
          onDateChange={onDateChange}
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
              borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
              zIndex: 1,
            },
            ".rbc-time-slot:not(.rbc-today), .rbc-day-bg:not(.rbc-off-range-bg )":
              {
                bgcolor: (theme) => alpha(theme.palette.secondary.lighter, 0.2),
              },
            ".rbc-today.rbc-time-slot, .rbc-today:not(.rbc-off-range-bg,.rbc-time-header-cell):not(.rbc-header)":
              {
                bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.5),
              },
            ".rbc-event, .rbc-background-event": {
              height: "100%",
              bgcolor: "#fff",
            },
            ".rbc-timeslot-group": {
              minHeight: ` ${zoom * 24}px !important`,
            },
            ".rbc-time-slot:hover": {
              cursor: "pointer",
            },
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
            onView={(v) => setView(v)}
            onNavigate={(...e) => console.log(e)}
            onSelectSlot={handleSlotSelect}
            onSelectEvent={handleEventSelect}
            timeslots={2}
            components={{
              event: ({ event }) => {
                if (event?.title)
                  return (
                    <CustomAppointment
                      appointment={event}
                      isMonthView={view === Views.MONTH}
                    />
                  );
                return null;
              },
            }}
          />
        </Box>
      </Box>
    );
  },
);

CustomCalender.displayName = "CustomCalender";

export default CustomCalender;
