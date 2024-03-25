import { Box, Button, ButtonGroup, Slider, Stack } from "@mui/material";
import React, { useMemo } from "react";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CustomDatePicker from "../CustomDatePicker";
import { Views } from "react-big-calendar";
import CustomButton from "../CustomButton";
import moment from "moment";
import { Page } from "../../../constants/common";

const ViewsEnum = [
  {
    name: "Month",
    value: Views.MONTH,
  },
  {
    name: "Week",
    value: Views.WEEK,
  },
  {
    name: "Day",
    value: Views.DAY,
  },
];

const iconStyle = {
  cursor: "pointer",
  padding: "2px",
  fontSize: "32px",
  ":hover": {
    padding: "0px",
    color: "primary.main",
  },
  height: "100%",
};

const CustomToolbar = ({
  zoom,
  setZoom,
  view,
  onViewChange,
  date,
  onDateChange,
  dateText,
  onNextClick,
  onPrevClick,
  page,
}) => {
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
          sx={iconStyle}
          onClick={() => setZoom((prev) => (prev + 5 > 20 ? 20 : prev + 5))}
          titleAccess="Zoom In"
        />
        <Slider
          aria-label="Zoom"
          value={zoom}
          min={5}
          max={20}
          onChange={(e, v) => setZoom(v)}
          sx={{ minWidth: "80px", color: "primary.dark" }}
          size="small"
        />
        <ZoomOutRoundedIcon
          sx={iconStyle}
          onClick={() => setZoom((prev) => (prev - 5 < 5 ? 5 : prev - 5))}
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
          style={{ height: "100%" }}
        />
      </Box>
      {page === Page.MY_APPOINTMENT && (
        <Stack>
          <CustomButton
            btnText="Today"
            color="primary"
            style={{
              fontWeight: 500,
              bgcolor: "#fff",
              borderColor: "transparent",
              ":hover": {
                bgcolor: "primary.main",
                color: "#fff",
                borderColor: "transparent",
              },
            }}
            variant="outlined"
            onClick={() => onDateChange(moment(new Date()))}
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
          sx={iconStyle}
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
          sx={iconStyle}
          onClick={onNextClick}
          titleAccess={`Next ${view}`}
        />
      </Stack>
      <ButtonGroup size="small">
        {ViewsEnum.map((viewEnum) => (
          <CustomButton
            key={viewEnum.value}
            variant={view === viewEnum.value ? "contained" : "outlined"}
            style={{
              fontWeight: 500,
            }}
            onClick={(e) => onViewChange(e, viewEnum.value)}
            btnText={viewEnum.name}
          />
        ))}
      </ButtonGroup>
    </Stack>
  );
};

export default CustomToolbar;
