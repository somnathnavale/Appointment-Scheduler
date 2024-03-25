import { Stack } from "@mui/material";
import React from "react";
import CustomButton from "../CustomButton";
import { defaultContextMenu } from "../../../constants/calenderConstants";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useDispatch } from "react-redux";
import { setPageView } from "../../../features/schedule/scheduleSlice";
import { Page } from "../../../constants/common";

const CustomMenuCalender = ({ contextMenuInfo, setContextMenuInfo }) => {
  const dispatch = useDispatch();

  return (
    <Stack
      sx={{
        display: contextMenuInfo?.xPosition ? "flex" : "none",
        position: "fixed",
        top: contextMenuInfo.yPosition || 0,
        left: contextMenuInfo.xPosition || 0,
        zIndex: 1000,
        bgcolor: "grey.300",
        borderRadius: 1,
        px: 2,
        py: 1,
        transform: "translate(-50%,-50%)",
      }}
      spacing={1}
      direction="row"
      alignItems="center"
    >
      <CustomButton
        onClick={() => dispatch(setPageView(Page.SCHEDULE))}
        color="primary"
        style={{ fontWeight: 500, fontSize: "16px" }}
        btnText="Create Appointment"
      />
      <HighlightOffRoundedIcon
        sx={{
          cursor: "pointer",
          ":hover": {
            color: "primary.dark",
          },
          height: "100%",
          fontSize: "36px",
        }}
        onClick={() => setContextMenuInfo(defaultContextMenu)}
      />
    </Stack>
  );
};

export default CustomMenuCalender;
