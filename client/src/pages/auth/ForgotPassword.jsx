import React, { useCallback, useState } from "react";
import Layout from "./Layout";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import { Severity, defaultAsyncInfo } from "../../constants/common";
import { Typography } from "@mui/material";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import CustomButton from "../../components/common/CustomButton";
import {
  ForPassStageFields,
  ForPassStage,
  defaultForgotPasswordForm,
  forgotPasswordFormFields,
} from "../../constants/userConstants";
import { ErrorHandler } from "../../helpers/asyncHandler";
import axiosPublic from "../../config/axios";
import { Endpoints } from "../../constants/endpoints";
import useRouting from "../../hooks/useRouting";
import { AppRoutes } from "../../constants/routes";

const styles = {
  btn: { mt: 2, width: "100%" },
  formField: { mt: 2 },
};

const ForgotPassword = () => {
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);
  const [formData, setFormData] = useState(defaultForgotPasswordForm);
  const [stage, setStage] = useState(ForPassStage.USERNAME);

  const {navigate} = useRouting();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Submitting...",
      });
      try {
        if (stage === ForPassStage.USERNAME) {
          await axiosPublic.post(Endpoints.FORGOT_PASSWORD_EMAIL, {
            email: formData.email,
          });
          setAsyncInfo({
            ...defaultAsyncInfo,
            severity: Severity.SUCCESS,
            message: "OTP Sent to Your Registered Email Id",
          });
          setStage(ForPassStage.OTP);
        } else if (stage === ForPassStage.OTP) {
          await axiosPublic.post(Endpoints.FORGOT_PASSWORD_OTP, {
            email: formData.email,
            otp: formData.otp,
          });
          setAsyncInfo({
            ...defaultAsyncInfo,
            severity: Severity.SUCCESS,
            message: "OTP Verified Successfully",
          });
          setStage(ForPassStage.PASSWORD);
        } else if (stage === ForPassStage.PASSWORD) {
          if (formData.password != formData.confirmPassword) {
            setAsyncInfo({
              severity: Severity.WARNING,
              message: "password and confirm password are not matching.",
            });
            return;
          }
          await axiosPublic.post(Endpoints.FORGOT_PASSWORD_RESET, {
            email: formData.email,
            otp: formData.otp,
            password: formData.password,
          });
          navigate(AppRoutes.LOGIN, {
            state: {
              navigate: true,
              message: "Password changed successfully",
              severity: Severity.SUCCESS,
            },
          });
        }
      } catch (error) {
        console.log(error)
        const errObj = ErrorHandler(error);
        setAsyncInfo({ severity: Severity.ERROR, message: errObj.message });
      }
    },
    [stage, formData, navigate]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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
        Forgot Password
      </Typography>
      <form>
        {forgotPasswordFormFields
          .filter(
            (field) => ForPassStageFields[stage]?.indexOf(field.name) != -1
          )
          .map((field) => (
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
        <CustomButton
          btnText={asyncInfo.loading ? "Submitting..." : "Submit"}
          style={styles.btn}
          disabled={asyncInfo.loading}
          type="button"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

const ForgotPasswordWithLayout = () => {
  return (
    <Layout>
      <ForgotPassword />
    </Layout>
  );
};

export default ForgotPasswordWithLayout;
