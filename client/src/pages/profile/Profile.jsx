import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import CustomTextField from "../../components/common/CustomTextField";
import { defaultRegisterUserForm } from "../../constants/userConstants";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [formData,setFormData]=useState(defaultRegisterUserForm);
  
  useEffect(()=>{
    setFormData(prev=>({...prev,...user}));
  },[user])

  const handleChange = (e) => {
    return ((name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    })(e.target.name, e.target.value);
  };

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: "/profile" }} />;
  }

  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        height:"100%"
      }}
    >
      <Box
        sx={{
          width: "1180px",
          maxWidth: "100%",
          mx: "auto",
          justifyContent: "space-between",
          px: {
            xs: 2,
            sm: 3,
          },
          py: 4,
        }}
      >
        <Box sx={{py:4,bgcolor:"#fff",borderRadius:2,maxWidth:"sm",mx:"auto"}}>
          
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
