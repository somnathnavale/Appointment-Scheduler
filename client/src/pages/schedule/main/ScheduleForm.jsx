import { Box, Grid, Typography, css } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { registerAppointmentFields } from "../../../constants/appointmentConstants";
import CustomDatePicker from "../../../components/common/CustomDatePicker";

const ScheduleForm = () => {
  const { selectedUser } = useSelector((store) => store.schedule);
  const [formData, setFormData] = useState({});

  return (
    <Box>
      <div>
        ScheduleForm- Date, start, end , one time, instnaces, status disabled,
        schedule with disabled, location title desc
      </div>
      <p>{selectedUser.name}</p>
      <Box>
        <Typography variant="h5" textAlign="center">
          Appointment Form
        </Typography>
        <form>
          <Grid container spacing={2}>
            {registerAppointmentFields.map((field, idx) => {
              return (
                <Grid item key={idx} xs={4}>
                  {field?.name}
                </Grid>
              );
            })}
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ScheduleForm;
