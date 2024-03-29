import { Box, ButtonGroup, Slider, Stack } from "@mui/material";
import React, { memo, useCallback } from "react";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CustomDatePicker from "../CustomDatePicker";
import CustomButton from "../CustomButton";
import moment from "moment";
import { Page } from "../../../constants/common";
import { ViewsEnum } from "../../../constants/calenderConstants";

const styles = {
  iconStyle: {
    cursor: "pointer",
    padding: "2px",
    fontSize: "32px",
    ":hover": {
      padding: "0px",
      color: "primary.main",
    },
    height: "100%",
  },
  datePicker: { height: "100%" },
  todayBtn: {
    fontWeight: 500,
    bgcolor: "#fff",
    borderColor: "transparent",
    ":hover": {
      bgcolor: "primary.main",
      color: "#fff",
      borderColor: "transparent",
    },
  },
  viewBtn: { fontWeight: 500 },
};

const CustomToolbar = memo((props) => {
  const {
    zoom,
    changeZoom,
    view,
    onViewChange,
    date,
    onDateChange,
    dateText,
    onNextClick,
    onPrevClick,
    page,
  } = props;

  const handleViewChange = useCallback(
    (e) => onViewChange(e, e.target.id),
    [onViewChange],
  );

  const handleDateChange = useCallback(
    () => onDateChange(moment(new Date())),
    [onDateChange],
  );

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        p: 1,
        mb: 1,
        position: "sticky",
        top: 0,
        bgcolor: "grey.300",
        zIndex: 10,
      }}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        <ZoomInRoundedIcon
          sx={styles.iconStyle}
          onClick={() => changeZoom(zoom + 5 > 20 ? 20 : zoom + 5)}
          titleAccess="Zoom In"
        />
        <Slider
          aria-label="Zoom"
          value={zoom}
          min={5}
          max={20}
          onChange={(e, v) => changeZoom(v)}
          sx={{ minWidth: "80px", color: "primary.dark" }}
          size="small"
        />
        <ZoomOutRoundedIcon
          sx={styles.iconStyle}
          onClick={() => changeZoom(zoom - 5 < 5 ? 5 : zoom - 5)}
          titleAccess="Zoom Out"
        />
      </Stack>
      <Box
        sx={{
          maxWidth: "150px",
          ".MuiOutlinedInput-input": { p: 1, pr: 0 },
        }}
      >
        <CustomDatePicker
          value={date}
          onChange={onDateChange}
          style={styles.datePicker}
        />
      </Box>
      {page === Page.MY_APPOINTMENT && (
        <Stack>
          <CustomButton
            btnText="Today"
            color="primary"
            style={styles.todayBtn}
            variant="outlined"
            onClick={handleDateChange}
          />
        </Stack>
      )}
      <Stack
        direction="row"
        sx={{
          bgcolor: "#fff",
          color: "primary.main",
          borderRadius: 1,
        }}
      >
        <ArrowBackRoundedIcon
          sx={styles.iconStyle}
          onClick={onPrevClick}
          titleAccess={`Previous ${view}`}
        />
        <Box
          sx={{
            color: "#fff",
            px: 1,
            py: 1,
            height: "100%",
            bgcolor: "primary.main",
          }}
        >
          {dateText}
        </Box>
        <ArrowForwardRoundedIcon
          sx={styles.iconStyle}
          onClick={onNextClick}
          titleAccess={`Next ${view}`}
        />
      </Stack>
      <ButtonGroup size="small">
        {ViewsEnum.map((viewEnum) => (
          <CustomButton
            key={viewEnum.value}
            variant={view === viewEnum.value ? "contained" : "outlined"}
            style={styles.viewBtn}
            onClick={handleViewChange}
            btnText={viewEnum.name}
            id={viewEnum.value}
          />
        ))}
      </ButtonGroup>
    </Stack>
  );
});

CustomToolbar.displayName = "CustomToolbar";

export default CustomToolbar;
