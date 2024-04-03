import { Grid } from "@mui/material";
import React, { memo, } from "react";
import {
  Action,
  changePasswordFormFields,
} from "../../constants/userConstants";
import GenerateFormFields from "../../components/common/GenerateFormFields";
import CustomButton from "../../components/common/CustomButton";

const styles = {
  changePassBtn: {
    width: "100%",
    fontWeight: 500,
    px: "7px",
    height: "100%",
  },
};

const ChangePassword = memo(({ asyncInfo, formData, handleChange, handleUpdatePassword }) => {
  
  return (
    <form onSubmit={handleUpdatePassword}>
      <Grid container spacing={1} sx={{ mt: 4 }}>
        {changePasswordFormFields.map((field) => (
          <Grid item key={field.name} xs={8}>
            <GenerateFormFields
              {...{
                ...field,
                value: formData[field.name],
                onChange: handleChange,
                size:"small"
              }}
            />
          </Grid>
        ))}
        <Grid item xs={4}>
          <CustomButton
            btnText={
              asyncInfo.loading &&
              asyncInfo.action === Action.CHANGE_PASSWORD
                ? "Changing Password..."
                : "Change Password"
            }
            style={styles.changePassBtn}
            variant="outlined"
            disabled={asyncInfo.loading}
          />
        </Grid>
      </Grid>
    </form>
  );
});

ChangePassword.displayName = "ChangePassword";

export default ChangePassword;
