import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page, Severity, defaultAsyncInfo } from "../../constants/common";
import axiosPublic from "../../config/axios";
import useAxios from "../../hooks/useAxios";
import {
  Actions,
  defaultAppointmentForm,
  readOnlyFields,
  updateAppointmentFields,
} from "../../constants/appointmentConstants";
import moment from "moment";
import {
  validateAppointmentInstanceUpdate,
  validateScheduleForm,
} from "../../helpers/appointmentsHelper";
import { Endpoints } from "../../constants/endpoints";
import {
  setPageNavigation,
  setPageView,
} from "../../features/schedule/scheduleSlice";
import { ErrorHandler } from "../../helpers/asyncHandler";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import { Grid } from "@mui/material";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import useAppointmentForm from "../schedule/main/useAppointmentForm";
import CustomButton from "../../components/common/CustomButton";
import Loading from "../../components/common/Loading";
import MoreActions from "./MoreActions";

const styles = {
  btn: { mr: 2, fontWeight: 500 },
};

const UpdateForm = memo(() => {
  const [disabled, setDisabled] = useState(false);

  const { selectedEvent } = useSelector((store) => store.schedule);

  const { user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState(defaultAppointmentForm);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const axios = useAxios(axiosPublic);
  const dispatch = useDispatch();

  const { remainingFields } = useAppointmentForm();

  useEffect(() => {
    if (selectedEvent?.appointmentId) {
      setFormData((prev) => ({
        ...prev,
        ...selectedEvent,
        scheduledWith: selectedEvent?.scheduledWith?.userId,
        scheduledBy: selectedEvent?.scheduledBy?.userId,
        date: moment(selectedEvent?.date) || null,
      }));
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent?.title) {
      const isDatePassed = moment(new Date()).isAfter(
        moment(selectedEvent?.date),
        "minute"
      );
      const isNotCreator = selectedEvent?.scheduledBy?.userId !== user?.userId;
      if (isDatePassed || isNotCreator) setDisabled(true);
    }
  }, [selectedEvent, user]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleAppointmentUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (asyncInfo.action !== Actions.APPOINTMENT) {
        setAsyncInfo((prev) => ({ ...prev, action: Actions.APPOINTMENT }));
        return;
      }
      const {severity,data,message} = validateScheduleForm(formData, "put");
      
      if (severity === Severity.WARNING) {
        setAsyncInfo(prev=>({ ...prev, severity,message }));
        return;
      }
      setAsyncInfo({
        action: Actions.APPOINTMENT ,
        severity:Severity.NONE,
        loading: true,
        message: "Updating Appointment...",
      });

      try {
        await axios.put(Endpoints.UPDATE_APPOINTMENT(formData.appointmentId),data);
        dispatch(setPageView(Page.CALENDER));
        dispatch(
          setPageNavigation({
            from: "UpdateForm",
            message: "Appointment updated successfully",
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
    },
    [formData, dispatch, asyncInfo.action,axios]
  );

  const handleInstanceUpdate = useCallback(async () => {
    if (asyncInfo.action !== Actions.INSTANCE) {
      setAsyncInfo((prev) => ({ ...prev, action: Actions.INSTANCE }));
      return;
    }
    const {data,severity,message} = validateAppointmentInstanceUpdate(formData);
    if (severity === Severity.WARNING) {
      setAsyncInfo(prev=>({ ...prev, severity,message }));
      return;
    }
    setAsyncInfo({
      action: Actions.INSTANCE ,
      severity:Severity.NONE,
      loading: true,
      message: "Updating Appointment Instance...",
    });
    try {
      await axios.put(
        Endpoints.UPDATE_APPOINTMENT_INSTANCE(
          formData.appointmentId,
          formData.appointmentInstanceId
        ),
        data
      );
      dispatch(setPageView(Page.CALENDER));
      dispatch(
        setPageNavigation({
          from: "UpdateForm",
          message: "Appointment instance updated successfully",
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
  }, [formData, dispatch, asyncInfo.action, axios]);

  const handleSnakClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <form>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={handleSnakClose}
        message={asyncInfo.message}
        severity={asyncInfo.severity}
      />
      {asyncInfo.loading && <Loading text={asyncInfo.message}/>}
      <Grid container spacing={2}>
        {updateAppointmentFields.map((field, idx) => {
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
                  readOnly: disabled || asyncInfo.action === "",
                  disabled:
                    asyncInfo.action !== "" &&
                    readOnlyFields[asyncInfo.action]?.indexOf(others.name) !==
                      -1,
                  disablePast: !disabled,
                }}
              />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex !important",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <CustomButton
            btnText={
              asyncInfo.action === Actions.APPOINTMENT
                ? asyncInfo.loading
                  ? "Updating Appointment..."
                  : "Update Appointment"
                : "Edit Appointment"
            }
            title="By updating appointment all future instances will be updated"
            type="button"
            disabled={asyncInfo.loading || disabled}
            style={styles.btn}
            opacity={asyncInfo.action !== Actions.APPOINTMENT ? 0.5 : 1}
            onClick={handleAppointmentUpdate}
          />
          <CustomButton
            btnText={
              asyncInfo.action === Actions.INSTANCE
                ? asyncInfo.loading
                  ? "Updating Instance..."
                  : "Update Instance"
                : "Edit Instance"
            }
            title="update current appointment instance"
            type="button"
            disabled={asyncInfo.loading || disabled}
            style={styles.btn}
            opacity={asyncInfo.action !== Actions.INSTANCE ? 0.5 : 1}
            onClick={handleInstanceUpdate}
          />
        </Grid>
        <MoreActions setAsyncInfo={setAsyncInfo} disabled={disabled}/>
      </Grid>
    </form>
  );
});

UpdateForm.displayName = "UpdateForm";

export default UpdateForm;
