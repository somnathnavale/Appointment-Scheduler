import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dropdown from "../../../constants/dropdown.json";
import moment from "moment";

const appointmentType = dropdown.appointmentType;

const CustomAppointment = ({ appointment, isMonthView }) => {
  const { selectedUser } = useSelector((store) => store.schedule);

  if (appointment?.type == null && appointment.scheduledWith === null) {
    return (
      <Box
        sx={{
          bgcolor: "grey.400",
          color: "grey.400",
          p: "2px",
          overflow: isMonthView ? "hidden" : "initial",
          height: "100%",
          border: "1px solid red",
          borderColor: "grey.600",
        }}
        title={
          isMonthView
            ? "From " +
              moment(appointment.start).format("HH:mm") +
              " To " +
              moment(appointment.end).format("HH:mm")
            : ""
        }
      >
        <Typography variant="body1" sx={{ fontSize: "14px", lineHeight: 1.2 }}>
          Private Appointment of{" "}
          {selectedUser.firstname + " " + selectedUser.lastname}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor:
          appointment?.type ===
          appointmentType.find((type) => type.value === "IN_PERSON").value
            ? "secondary.lighter"
            : "primary.lighter",
        color: "black",
        p: "2px",
        overflow: isMonthView ? "hidden" : "initial",
        height: "100%",
        border: "1px solid red",
        borderColor:
          appointment?.type ===
          appointmentType.find((type) => type.value === "IN_PERSON").value
            ? "secondary.light"
            : "primary.light",
      }}
      title={
        isMonthView
          ? "From " +
            moment(appointment.start).format("HH:mm") +
            " To " +
            moment(appointment.end).format("HH:mm")
          : ""
      }
    >
      <Typography variant="body1" sx={{ fontSize: "14px", lineHeight: 1.2 }}>
        {appointment.title}
      </Typography>
      {!isMonthView && (
        <Typography
          variant="span"
          sx={{ fontSize: "12px", lineHeight: 1.2, display: "inline-block" }}
        >
          {`with: ${appointment?.scheduledWith?.firstname} ${appointment?.scheduledWith?.lastname}`}
          <br />
          {`at: ${appointment?.location}`}
        </Typography>
      )}
    </Box>
  );
};

export default CustomAppointment;
