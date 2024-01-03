import React, {useState } from "react";
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

const Login = () => {
  const [formData, setFormData] = useState(defaultLoginUserForm);
  const [info, setInfo] = useState(defaultInfo);

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const location=useLocation();

  const handleChange = (e) => {
    return ((name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    })(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setInfo({ status: STATUS.LOADING, message: "Logging in..." });
      const response = await axiosPublic.post(ENDPOINTS.login, formData);
      dispatch(setUser(response.data));
      sessionStorage.setItem("user",JSON.stringify(response.data));
      setInfo({ status: STATUS.SUCCESS, message: "" });
      setFormData(defaultLoginUserForm);
      const path=location.state?.from || "/home";
      navigate(path);
    } catch (error) {
      const errObj = ErrorHandler(error);
      setInfo({ status: STATUS.ERROR, message: errObj.message });
    }
  };

  return (
    <Layout>
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
          style={{ ml: 1 }}
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
              style: { mt: 2 },
            }}
          />
        ))}
        <CustomLinkPrimary
          linkText="Forgot passsword ?"
          url="/forgot-password"
          style={{
            color: "secondary.main",
            display: "block",
            mt: 2,
            textAlign: "right",
          }}
        />
        <CustomButton
          btnText={info.status === STATUS.LOADING ? "Logging in..." : "Login"}
          style={{ mt: 2 }}
          disabled={info.status === STATUS.LOADING}
        />
      </form>
    </Layout>
  );
};

export default Login;
