import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  defaultRegisterUserForm,
  registerFormFields,
} from "../../constants/userConstants";
import Layout from "./Layout";
import CustomLinkPrimary from "../../components/common/CustomLinkPrimary";
import CustomButton from "../../components/common/CustomButton";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import axiosPublic from "../../config/axios";
import { ENDPOINTS } from "../../constants/endpoints";
import { STATUS, defaultInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [info, setInfo] = useState(defaultInfo);
  const [formData, setFormData] = useState(defaultRegisterUserForm);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo({ status: STATUS.LOADING, message: "Registering User..." });
    try {
      await axiosPublic.post(ENDPOINTS.registerUser, formData);
      setInfo({ status: STATUS.SUCCESS, message: "" });
      navigate("/login");
    } catch (error) {
      const errObj = ErrorHandler(error);
      setInfo({ status: STATUS.ERROR, message: errObj.message });
    }
  };

  const handleChange = (e) => {
    return ((name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    })(e.target.name, e.target.value);
  };

  const columnCalculator = (name) => {
    if (name === "firstname" || name === "lastname") return 6;
    return 12;
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        sx={{
          color: "grey.800",
        }}
      >
        Get started with Calendify
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="span">Already have an account?</Typography>
        <CustomLinkPrimary linkText="Sign in" url="/login" style={{ ml: 1 }} />
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {registerFormFields.map((field) => (
            <Grid item key={field.name} xs={columnCalculator(field.name)}>
              <GenerateFormFields
                {...{
                  ...field,
                  value: formData[field.name],
                  onChange: handleChange,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <CustomButton
          btnText={
            info.status === STATUS.LOADING ? "Logging In..." : "Create account"
          }
          style={{ mt: 2 }}
          disabled={info.status === STATUS.LOADING}
        />
      </form>
    </Layout>
  );
};

export default Register;
