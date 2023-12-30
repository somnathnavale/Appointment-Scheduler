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

const Register = () => {
  const [formData, setFormData] = useState(defaultRegisterUserForm);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    return ((name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    })(e.target.name, e.target.value);
  };

  const columnCalculator=(name)=>{
    if(name==="firstname" || name==="lastname")
      return 6;
    return 12;
  }

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
        <Grid container spacing={2} sx={{mt:2}}>
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
          btnText={"Create account"}
          color="primary"
          style={{ mt: 2 }}
        />
      </form>
    </Layout>
  );
};

export default Register;
