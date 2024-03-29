import { Stack } from "@mui/material";
import React, { memo, useCallback } from "react";
import CustomButton from "../CustomButton";
import { defaultContextMenu } from "../../../constants/calenderConstants";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const styles = {
  crAppStyle: { fontWeight: 500, fontSize: "16px" },
};

const CustomMenuCalender = memo(
  ({ contextMenuInfo, handleCreateSelect, setContextMenuInfo }) => {
    const onCreateSelect = useCallback(
      () => handleCreateSelect(contextMenuInfo),
      [handleCreateSelect, contextMenuInfo],
    );

    const onCancelSelect = useCallback(
      () => setContextMenuInfo(defaultContextMenu),
      [setContextMenuInfo],
    );

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
          onClick={onCreateSelect}
          color="primary"
          style={styles.crAppStyle}
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
          onClick={onCancelSelect}
        />
      </Stack>
    );
  },
);

CustomMenuCalender.displayName = "CustomMenuCalender";

export default CustomMenuCalender;
