import React, { memo, useCallback, useEffect, useState } from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/common/CustomButton";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import {
  changePasswordFormFields,
  defaultRegisterUserForm,
  updateUserFormFields,
} from "../../constants/userConstants";

import { STATUS, defaultInfo } from "../../constants/common";
import useAxios from "../../hooks/useAxios";
import axiosPublic from "../../config/axios";
import { ErrorHandler } from "../../helpers/asyncHandler";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import { setUser } from "../../features/user/userSlice";
import useLogout from "../../hooks/useLogout";

const styles = {
  innerLayout: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  editBtn: { mt: 2, width: "100%", fontWeight: 500 },
  changePassBtn: {
    width: "100%",
    fontWeight: 500,
    px: 1,
    height: "100%",
  },
  logoutBtn: { width: "100%", mt: 4 },
};

const Profile = memo(() => {
  const [info, setInfo] = useState(defaultInfo);
  const [editToggle, setEditToggle] = useState(false);
  const { user } = useSelector((store) => store.user);

  const [formData, setFormData] = useState(defaultRegisterUserForm);

  const axios = useAxios(axiosPublic);
  const dispatch = useDispatch();

  const handleLogout = useLogout();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...user }));
  }, [user]);

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (!editToggle) {
        setEditToggle(true);
        return;
      }
      setInfo({ status: STATUS.LOADING, message: "Updating User" });
      const updatedUserObj = {
        userId: formData.userId,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      };
      try {
        await axios.put(`/api/users/${formData.userId}`, updatedUserObj);
        setInfo({ status: STATUS.SUCCESS, message: "" });
        dispatch(setUser(updatedUserObj));
      } catch (error) {
        console.log(error);
        const errObj = ErrorHandler(error);
        setInfo({ status: STATUS.ERROR, message: errObj.message });
      }
    },
    [formData, axios, dispatch, editToggle],
  );

  const handleUpdatePassword = useCallback(
    async (e) => {
      e.preventDefault();
      setInfo({ status: STATUS.LOADING, message: "Changing User Password" });
      const updatedUserObj = { ...formData };
      try {
        await axios.put(
          `/api/auth/${formData.userId}/change-password`,
          updatedUserObj,
        );
        setInfo({ status: STATUS.SUCCESS, message: "" });
        setFormData((prev) => ({ ...prev, password: "" }));
      } catch (error) {
        const errObj = ErrorHandler(error);
        setInfo({ status: STATUS.ERROR, message: errObj.message });
      }
    },
    [axios, formData],
  );

  const handleChange = useCallback(
    (e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    [],
  );

  const onClose = useCallback(() => setInfo(defaultInfo), []);

  return (
    <InnerLayout style={styles.innerLayout} height="100%" bgcolor="grey.200">
      <ErrorSnackbar
        open={info.status === STATUS.ERROR}
        onClose={onClose}
        message={info.message}
      />
      <Box
        sx={{
          p: 2,
          maxWidth: { sm: "400px", md: "600px" },
        }}
      >
        <Typography variant="h4" color="secondary.dark">
          User Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              {updateUserFormFields.map((field) => (
                <Grid item key={field.name} xs={12}>
                  <GenerateFormFields
                    {...{
                      ...field,
                      value: formData[field.name],
                      onChange: handleChange,
                      disabled: !editToggle,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <CustomButton
              btnText={
                editToggle
                  ? info.status === STATUS.LOADING
                    ? "Updating User..."
                    : "Update User"
                  : "Edit User"
              }
              style={styles.editBtn}
              disabled={info.status === STATUS.LOADING}
            />
          </form>
        </Box>
        <Box>
          <form onSubmit={handleUpdatePassword}>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {changePasswordFormFields.map((field) => (
                <Grid item key={field.name} xs={8}>
                  <GenerateFormFields
                    {...{
                      ...field,
                      value: formData[field.name],
                      onChange: handleChange,
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={4}>
                <CustomButton
                  btnText={
                    info.status === STATUS.LOADING
                      ? "Changing Password..."
                      : "Change Password"
                  }
                  style={styles.changePassBtn}
                  disabled={info.status === STATUS.LOADING}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
        <CustomButton
          btnText="Logout"
          style={styles.logoutBtn}
          variant="outlined"
          color="error"
          disabled={info.status === STATUS.LOADING}
          onClick={handleLogout}
        />
      </Box>
    </InnerLayout>
  );
});

Profile.displayName = "Profile";

const WrappedProfile = () => {
  return (
    <InnerLayout style={styles.innerLayout} height="100%" bgcolor="grey.200">
      <Profile />
    </InnerLayout>
  );
};

export default WrappedProfile;
