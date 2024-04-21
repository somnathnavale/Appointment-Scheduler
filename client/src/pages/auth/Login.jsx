import React, { memo, useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import { Box, Typography } from "@mui/material";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import CustomButton from "../../components/common/CustomButton";
import CustomLinkPrimary from "../../components/common/CustomLinkPrimary";
import {
  defaultLoginUserForm,
  loginFormFields,
} from "../../constants/userConstants";
import axiosPublic from "../../config/axios";
import { Endpoints } from "../../constants/endpoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { Severity, defaultAsyncInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import useRouting from "../../hooks/useRouting";
import { AppRoutes } from "../../constants/routes";

const styles = {
  calink: { ml: 1 },
  fplink: {
    color: "secondary.main",
    display: "block",
    mt: 2,
    textAlign: "right",
  },
  loginBtn: { mt: 2, width: "100%" },
  formField: { mt: 2 },
};

const Login = memo(() => {
  const [formData, setFormData] = useState(defaultLoginUserForm);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const dispatch = useDispatch();
  const { navigate, location } = useRouting();

  useEffect(() => {
    if (location.state?.navigate) {
      let { message, severity } = location.state;
      setAsyncInfo({ message, severity });
    }
  }, [location]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Logging in...",
      });
      const response = await axiosPublic.post(Endpoints.LOGIN, formData);
      dispatch(setUser(response.data));
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setAsyncInfo({ ...defaultAsyncInfo, severity: Severity.SUCCESS });
      setFormData(defaultLoginUserForm);
      const path = location.state?.from || AppRoutes.HOME;
      navigate(path);
    } catch (error) {
      const errObj = ErrorHandler(error);
      setAsyncInfo({ severity: Severity.ERROR, message: errObj.message });
    }
  };

  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo?.severity}
      />
      <Typography
        variant="h4"
        sx={{
          color: "grey.800",
        }}
      >
        Sign in to Calendify
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="span">Don&apos;t have an account?</Typography>
        <CustomLinkPrimary
          linkText="Create account"
          url={AppRoutes.REGISTER}
          style={styles.calink}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        {loginFormFields.map((field) => (
          <GenerateFormFields
            key={field.name}
            {...{
              ...field,
              value: formData[field.name],
              onChange: handleChange,
              style: styles.formField,
            }}
          />
        ))}
        <CustomLinkPrimary
          linkText="Forgot passsword ?"
          url={AppRoutes.FORGOT_PASSWORD}
          style={styles.fplink}
        />
        <CustomButton
          btnText={asyncInfo.loading ? "Logging in..." : "Login"}
          style={styles.loginBtn}
          disabled={asyncInfo.loading}
        />
      </form>
    </>
  );
});

Login.displayName = "Login";

const LoginWithLayout = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default LoginWithLayout;
