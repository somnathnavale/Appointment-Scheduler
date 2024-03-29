import React, { memo, useCallback, useState } from "react";
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
import { ENDPOINTS } from "../../constants/endpoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { STATUS, defaultInfo } from "../../constants/common";
import { ErrorHandler } from "../../helpers/asyncHandler";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [info, setInfo] = useState(defaultInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setInfo({ status: STATUS.LOADING, message: "Logging in..." });
      const response = await axiosPublic.post(ENDPOINTS.login, formData);
      dispatch(setUser(response.data));
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setInfo({ status: STATUS.SUCCESS, message: "" });
      setFormData(defaultLoginUserForm);
      const path = location.state?.from || "/home";
      navigate(path);
    } catch (error) {
      const errObj = ErrorHandler(error);
      setInfo({ status: STATUS.ERROR, message: errObj.message });
    }
  };

  return (
    <>
      <ErrorSnackbar
        open={info.status === STATUS.ERROR}
        onClose={() => setInfo(defaultInfo)}
        message={info.message}
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
          url="/register"
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
          url="/forgot-password"
          style={styles.fplink}
        />
        <CustomButton
          btnText={info.status === STATUS.LOADING ? "Logging in..." : "Login"}
          style={styles.loginBtn}
          disabled={info.status === STATUS.LOADING}
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
