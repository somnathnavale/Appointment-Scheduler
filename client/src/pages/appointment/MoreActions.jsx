import React, { memo, useState } from "react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";

import { useDispatch, useSelector } from "react-redux";
import { Page, Severity, defaultAsyncInfo } from "../../constants/common";
import { Endpoints } from "../../constants/endpoints";
import {
  setPageNavigation,
  setPageView,
  setSelectedEvent,
} from "../../features/schedule/scheduleSlice";
import { ErrorHandler } from "../../helpers/asyncHandler";
import useAxios from "../../hooks/useAxios";
import axiosPublic from "../../config/axios";

const actionsKey = {
  DELETE_APPOINTMENT: "Delete Appointment",
  DELETE_INSTANCE: "Delete Instance",
  DUPLICATE_APPOINTMENT: "Duplicate Appointment",
};

const actions = [
  {
    icon: <FolderDeleteIcon />,
    name: "Delete Appointment",
    key: actionsKey.DELETE_APPOINTMENT,
  },
  {
    icon: <DeleteIcon />,
    name: "Delete Instance",
    key: actionsKey.DELETE_INSTANCE,
  },
  {
    icon: <ControlPointDuplicateIcon />,
    name: "Duplicate Appointment",
    key: actionsKey.DUPLICATE_APPOINTMENT,
  },
];

const MoreActions = memo(({ setAsyncInfo, disabled }) => {
  const [open, setOpen] = useState(false);
  const { selectedEvent } = useSelector((store) => store.schedule);

  const dispatch = useDispatch();

  const axios = useAxios(axiosPublic);

  const handleAppointmentDelete = async () => {
    setAsyncInfo({
      ...defaultAsyncInfo,
      loading: true,
      message: "Deleting Appointment...",
    });
    try {
      await axios.delete(
        Endpoints.DELETE_APPOINTMENT(selectedEvent?.appointmentId)
      );
      dispatch(setPageView(Page.CALENDER));
      dispatch(
        setPageNavigation({
          from: "UpdateForm",
          message: "Appointment deleted successfully",
          severity: Severity.SUCCESS,
        })
      );
    } catch (error) {
      const errObj = ErrorHandler(error);
      setAsyncInfo({
        ...defaultAsyncInfo,
        severity: Severity.ERROR,
        message: errObj.message,
      });
    }
  };

  const handleAppointmentInstanceDelete = async () => {
    setAsyncInfo({
      ...defaultAsyncInfo,
      loading: true,
      message: "Deleting Appointment Instance...",
    });
    try {
      await axios.delete(
        Endpoints.DELETE_APPOINTMENT_INSTANCE(
          selectedEvent?.appointmentId,
          selectedEvent?.appointmentInstanceId
        )
      );
      dispatch(setPageView(Page.CALENDER));
      dispatch(
        setPageNavigation({
          from: "UpdateForm",
          message: "Appointment instance deleted successfully",
          severity: Severity.SUCCESS,
        })
      );
    } catch (error) {
      const errObj = ErrorHandler(error);
      setAsyncInfo({
        ...defaultAsyncInfo,
        severity: Severity.ERROR,
        message: errObj.message,
      });
    }
  };

  const duplicateAppointment = () => {
    dispatch(setPageView(Page.SCHEDULE));
    dispatch(
      setSelectedEvent({
        ...selectedEvent,
        appointmentId: -1,
        appointmentInstanceId: -1,
      })
    );
  };

  const handleActionSelect = async (action) => {
    setOpen(false);
    if (disabled && action !== actionsKey.DUPLICATE_APPOINTMENT) {
      setAsyncInfo({
        ...defaultAsyncInfo,
        message:
          "This action cannot be perform on this appointment or instance",
        severity: Severity.WARNING,
      });
      return;
    }
    if (action === actionsKey.DELETE_APPOINTMENT)
      await handleAppointmentDelete();
    if (action === actionsKey.DELETE_INSTANCE)
      await handleAppointmentInstanceDelete();
    if (action === actionsKey.DUPLICATE_APPOINTMENT) duplicateAppointment();
  };

  return (
    <SpeedDial
      ariaLabel="more options"
      sx={{
        position: "absolute",
        bottom: 16,
        right: 0,
      }}
      icon={<SpeedDialIcon />}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleActionSelect(action.key)}
        />
      ))}
    </SpeedDial>
  );
});

MoreActions.displayName="MoreActions";

export default MoreActions;
