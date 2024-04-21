import React, { memo } from "react";
import CustomButton from "../../components/common/CustomButton";
import { Box, Grid } from "@mui/material";
import { Action, updateUserFormFields } from "../../constants/userConstants";
import GenerateFormFields from "../../components/common/GenerateFormFields";

const styles = {
  editBtn: { mt: 2, width: "100%", fontWeight: 500 },
};

const UpdateProfile = memo(
  ({ asyncInfo, formData, editToggle, handleChange, handleUpdate }) => {
    return (
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
                ? asyncInfo.loading && asyncInfo.action === Action.UPDATE
                  ? "Updating User..."
                  : "Update User"
                : "Edit User"
            }
            style={styles.editBtn}
            disabled={asyncInfo.loading}
          />
        </form>
      </Box>
    );
  },
);

UpdateProfile.displayName = "UpdateProfile";

export default UpdateProfile;
