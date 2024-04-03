import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback } from "react";
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
import { Endpoints } from "../../constants/endpoints";
import { Severity, defaultAsyncInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import { useNavigate } from "react-router-dom";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import { AppRoutes } from "../../constants/routes";

const styles = {
  loginLink: { ml: 1 },
  caBtn: { mt: 2, width: "100%" },
};

const Register = () => {
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [formData, setFormData] = useState(defaultRegisterUserForm);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAsyncInfo({ ...defaultAsyncInfo, loading: true, message: "Registering User..." });
    try {
      await axiosPublic.post(Endpoints.REGISTER_USER, formData);
      setAsyncInfo({ ...defaultAsyncInfo, severity: Severity.SUCCESS });
      navigate(AppRoutes.LOGIN, {
        state: {
          navigate: true,
          message: "User registered successfully",
          severity: Severity.SUCCESS,
        },
      });
    } catch (error) {
      const errObj = ErrorHandler(error);
      setAsyncInfo({
        severity: Severity.ERROR,
        message: errObj.message,
        loading: false,
      });
    }
  };

  const handleChange = useCallback(
    (e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  const columnCalculator = (name) =>
    name === "firstname" || name === "lastname" ? 6 : 12;

  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo?.severity}
      />
      <Typography variant="h4" sx={{ color: "grey.800" }}>
        Get started with Calendify
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="span">Already have an account?</Typography>
        <CustomLinkPrimary
          linkText="Sign in"
          url={AppRoutes.LOGIN}
          style={styles.loginLink}
        />
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
            asyncInfo.loading ? "Creating accoount..." : "Create account"
          }
          style={styles.caBtn}
          disabled={asyncInfo.loading}
        />
      </form>
    </>
  );
};

const RegisterWithLayout = () => {
  return (
    <Layout>
      <Register />
    </Layout>
  );
};

export default RegisterWithLayout;
