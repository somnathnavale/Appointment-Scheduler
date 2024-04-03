import React, { memo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InnerLayout from "../../components/Layout/InnerLayout";
import CustomButton from "../../components/common/CustomButton";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import { useUserService } from "./useUserService";

import useLogout from "../../hooks/useLogout";

const styles = {
  innerLayout: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  logoutBtn: { width: "100%", mt: 4 },
};

const Profile = memo(() => {
  const handleLogout = useLogout();
  const {
    asyncInfo,
    onClose,
    formData,
    handleChange,
    handleUpdatePassword,
    editToggle,
    handleUpdate,
  } = useUserService();

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo.severity}
      />
      <Box
        sx={{
          p: 2,
          maxWidth: { sm: "400px", md: "600px" },
        }}
      >
        <Typography variant="h3" color="secondary.dark" sx={{fontWeight:500}}>
          User Details
        </Typography>
        <UpdateProfile
          asyncInfo={asyncInfo}
          formData={formData}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          editToggle={editToggle}
        />
        <ChangePassword
          asyncInfo={asyncInfo}
          formData={formData}
          handleChange={handleChange}
          handleUpdatePassword={handleUpdatePassword}
        />
        <CustomButton
          btnText="Logout"
          style={styles.logoutBtn}
          variant="outlined"
          color="error"
          disabled={asyncInfo.loading}
          onClick={handleLogout}
        />
      </Box>
    </>
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
