import { Box, Icon, Stack, Typography, alpha } from "@mui/material";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import dropdown from "../../../constants/dropdown.json";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const appointmentType = dropdown.type;
const appointmentStatus = dropdown.status;

const CustomAppointment = memo(({ appointment, isMonthView }) => {
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

  const inPersonMeet =
    appointment?.type ===
    appointmentType.find((type) => type.value === "IN_PERSON").value;

  return (
    <Box
      sx={{
        bgcolor: inPersonMeet
          ? (theme) => alpha(theme.palette.secondary.lighter, 0.5)
          : (theme) => alpha(theme.palette.primary.lighter, 0.5),
        color: "black",
        p: "2px",
        overflow: isMonthView ? "hidden" : "initial",
        height: "100%",
        border: "1px solid red",
        borderColor: inPersonMeet ? "secondary.light" : "primary.light",
      }}
      title={
        isMonthView
          ? "From " +
            moment(appointment.start).format("HH:mm") +
            " To " +
            moment(appointment.end).format("HH:mm")
          : "Click To View"
      }
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          lineHeight: 1.2,
          textWrap: "nowrap",
          color: inPersonMeet ? "secondary.dark" : "primary.main",
        }}
      >
        {appointment.title}
      </Typography>
      {!isMonthView && (
        <Stack spacing="2px" sx={{ ml: "-2px" }}>
          <EventSpecification
            inPersonMeet={inPersonMeet}
            icon={PersonRoundedIcon}
            text={
              appointment?.scheduledWith?.firstname +
              " " +
              appointment?.scheduledWith?.lastname
            }
          />
          <EventSpecification
            inPersonMeet={inPersonMeet}
            icon={LocationOnIcon}
            text={appointment?.location}
          />
          <EventSpecification
            inPersonMeet={inPersonMeet}
            icon={FactCheckRoundedIcon}
            text={
              appointmentStatus.find(
                (type) => type.value === appointment?.status,
              ).label
            }
          />
          <EventSpecification
            inPersonMeet={inPersonMeet}
            icon={EventRepeatRoundedIcon}
            text={
              appointmentType.find((type) => type.value === appointment?.type)
                ?.label
            }
          />
          <EventSpecification
            inPersonMeet={inPersonMeet}
            icon={DescriptionRoundedIcon}
            text={appointment?.description}
          />
        </Stack>
      )}
    </Box>
  );
});

CustomAppointment.displayName = "CustomAppointment";

export default CustomAppointment;

const EventSpecification = memo((props) => {
  const { inPersonMeet, text, icon: Icon } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        textWrap: "nowrap",
      }}
    >
      {Icon && (
        <Icon fontSize="16px" color={inPersonMeet ? "secondary" : "primary"} />
      )}
      <span style={{ fontSize: "14px" }}>{text}</span>
    </Box>
  );
});

EventSpecification.displayName = "EventSpecification";
