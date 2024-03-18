import { Box, Button,alpha } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CustomButton from "../../components/common/CustomButton";
import { useNavigate } from "react-router-dom";

const AppointmentView = ({ appointment }) => {
  const navigate = useNavigate();
  return (
    <Box>

    
    <Box sx={{bgcolor:(theme) => alpha(theme.palette.secondary.lighter, 0.25)}}>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <ArrowBackRoundedIcon
          sx={{
            color: "primary.main",
            border:"1px solid red",
            borderColor: "primary.main",
            cursor: "pointer",
            fontSize: "40px",
            borderRadius: "50%",
            ":hover":{
                opacity:"80%"
            }
          }}
        />
        <CustomButton
          btnText="Edit Appointment"
          onClick={() => navigate("edit")}
          type="secondary"
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
    <Box>
      {JSON.stringify(appointment)}
    </Box>
    </Box>
  );
};

export default AppointmentView;
