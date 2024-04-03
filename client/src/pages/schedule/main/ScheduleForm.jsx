import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultAppointmentForm,
  registerAppointmentFields,
} from "../../../constants/appointmentConstants";
import GenerateFormFields from "../../../components/common/GenerateFormFields";
import dropdown from "../../../constants/dropdown.json";
import moment from "moment";
import CustomButton from "../../../components/common/CustomButton";
import { validateScheduleForm } from "../../../helpers/appointmentsHelper";
import { Page, Severity, defaultAsyncInfo } from "../../../constants/common";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import useAxios from "../../../hooks/useAxios";
import axiosPublic from "../../../config/axios";
import { Endpoints } from "../../../constants/endpoints";
import { setPageNavigation, setPageView } from "../../../features/schedule/scheduleSlice";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";

const ScheduleForm =() => {
  const {  selectedUser,selectedEvent } = useSelector(
    (store) => store.schedule
  );
  const { user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState(defaultAppointmentForm);
  const [asyncInfo,setAsyncInfo] = useState(defaultAsyncInfo);

  const axios= useAxios(axiosPublic);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...selectedEvent,
      date: selectedEvent?.date
        ? moment(selectedEvent?.date)
        : prev.date,
    }));
  }, [selectedEvent]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const scheduledWithLov = useMemo(
    () => [
      {
        label: selectedUser.name,
        value: selectedUser.userId,
      },
    ],
    [selectedUser]
  );

  const scheduledByLov = useMemo(
    () => [
      {
        label: user.firstname + " " + user.lastname,
        value: user.userId,
      },
    ],
    [user]
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

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const validationResponse=validateScheduleForm(formData);
    if(validationResponse.severity===Severity.WARNING){
      setAsyncInfo({...defaultAsyncInfo,severity:Severity.WARNING,message:validationResponse.message});
      return;
    }
    
    setAsyncInfo({...defaultAsyncInfo, loading:true , mssage:"Creating Appointment..."});
    
    try {
      const data= validationResponse.data;
      await axios.post(Endpoints.CREATE_APPOINTMENT,data);
      dispatch(setPageView(Page.CALENDER))
      dispatch(setPageNavigation({
        from: "ScheduleForm",
        message:"Appointment created successfully",
        severity:Severity.SUCCESS
      }))
    } catch (error) {
      const errObj= ErrorHandler(error);
      setAsyncInfo({
        ...defaultAsyncInfo,
        severity:Severity.ERROR,
        message:errObj.message
      })
    }
  }
  const handleSnakClose =useCallback(() => setAsyncInfo(defaultAsyncInfo),[])

  return (
    <form onSubmit={handleSubmit}>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={handleSnakClose}
        message={asyncInfo.message}
        severity={asyncInfo.severity}
      />
      <Grid container spacing={2} >
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
          sx={{ display: "flex !important", justifyContent: "center",mt:1  }}
        >
          <CustomButton btnText="Schedule Appointment" color="primary" disabled={asyncInfo.loading}/>
        </Grid>
      </Grid>
    </form>
  );
};

ScheduleForm.displayName = "ScheduleForm";


export default ScheduleForm;
