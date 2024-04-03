import { Stack, Typography } from "@mui/material";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/common/CustomButton";
import {
  setPageView,
  setSelectedEvent,
} from "../../../features/schedule/scheduleSlice";
import { Page } from "../../../constants/common";

const UserInfo = memo(({ selectedUser }) => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const handleScheduleClick = useCallback(() => {
    dispatch(setPageView(Page.SCHEDULE));
    dispatch(
      setSelectedEvent({
        appointmentId:-1,
        appointmentInstanceId:-1,
        scheduledWith: selectedUser.userId,
        scheduledBy: user.userId,
      })
    );
  }, [dispatch, user, selectedUser]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "100%", bgcolor: "grey.300", px: 2, py: 1 }}
    >
      <Typography variant="h4">
        {selectedUser.firstname + " " + selectedUser.lastname}{" "}
        {user.userId === selectedUser.userId ? " (You)" : ""}
      </Typography>
      {user.userId !== selectedUser.userId && (
        <CustomButton
          btnText="Schedule"
          variant="outlined"
          color="secondary"
          onClick={handleScheduleClick}
        />
      )}
    </Stack>
  );
});

UserInfo.displayName = "UserInfo";

export default UserInfo;
