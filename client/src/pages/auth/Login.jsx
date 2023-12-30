import React, { useState } from "react";
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

const Login = () => {
  const [formData, setFormData] = useState(defaultLoginUserForm);

  const handleChange = (e) => {
    return ((name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    })(e.target.name, e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response=await axiosPublic.post(ENDPOINTS.login,formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
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
        <CustomButton onClick={() => {}} btnText="Login" style={{ mt: 2 }} />
      </form>
    </Layout>
  );
};

export default Login;
