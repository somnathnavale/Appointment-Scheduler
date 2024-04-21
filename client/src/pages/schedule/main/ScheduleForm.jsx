import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultAppointmentForm,
  registerAppointmentFields,
} from "../../../constants/appointmentConstants";
import GenerateFormFields from "../../../components/common/GenerateFormFields";
import moment from "moment";
import CustomButton from "../../../components/common/CustomButton";
import { validateScheduleForm } from "../../../helpers/appointmentsHelper";
import { Page, Severity, defaultAsyncInfo } from "../../../constants/common";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import useAxios from "../../../hooks/useAxios";
import axiosPublic from "../../../config/axios";
import { Endpoints } from "../../../constants/endpoints";
import {
  setPageNavigation,
  setPageView,
} from "../../../features/schedule/scheduleSlice";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import useAppointmentForm from "./useAppointmentForm";
import Loading from "../../../components/common/Loading";

const ScheduleForm = () => {
  const { selectedEvent } = useSelector((store) => store.schedule);

  const [formData, setFormData] = useState(defaultAppointmentForm);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const dispatch = useDispatch();

  const axios = useAxios(axiosPublic);
  const { remainingFields } = useAppointmentForm(selectedEvent);

  useEffect(() => {
    if (selectedEvent?.appointmentId) {
      setFormData((prev) => ({
        ...prev,
        ...selectedEvent,
        date: moment(selectedEvent?.date) || null,
        scheduledWith: selectedEvent?.scheduledWith?.userId,
        scheduledBy: selectedEvent?.scheduledBy?.userId,
      }));
    }
  }, [selectedEvent]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResponse = validateScheduleForm(formData, "post");
    if (validationResponse.severity === Severity.WARNING) {
      setAsyncInfo({
        ...defaultAsyncInfo,
        severity: Severity.WARNING,
        message: validationResponse.message,
      });
      return;
    }

    setAsyncInfo({
      ...defaultAsyncInfo,
      loading: true,
      mssage: "Creating Appointment...",
    });

    try {
      const data = validationResponse.data;
      await axios.post(Endpoints.CREATE_APPOINTMENT, data);
      dispatch(setPageView(Page.CALENDER));
      dispatch(
        setPageNavigation({
          from: "ScheduleForm",
          message: "Appointment created successfully",
          severity: Severity.SUCCESS,
        }),
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

  const handleSnakClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <form onSubmit={handleSubmit}>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={handleSnakClose}
        message={asyncInfo.message}
        severity={asyncInfo.severity}
      />
      {asyncInfo.loading && <Loading text={asyncInfo.message} />}
      <Grid container spacing={2}>
        {registerAppointmentFields.map((field, idx) => {
          const { grid, ...others } = field;
          return (
            <Grid item key={idx} {...grid}>
              <GenerateFormFields
                {...{
                  ...others,
                  value: formData[others.name],
                  onChange: handleChange,
                  dropdownValues:
                    others.type === "dropdown" && remainingFields(others.name),
                }}
              />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sx={{ display: "flex !important", justifyContent: "center", mt: 1 }}
        >
          <CustomButton
            btnText={
              asyncInfo.loading
                ? "Scheduling Appointment..."
                : "Schedule Appointment"
            }
            color="primary"
            disabled={asyncInfo.loading}
          />
        </Grid>
      </Grid>
    </form>
  );
};

ScheduleForm.displayName = "ScheduleForm";

export default ScheduleForm;
