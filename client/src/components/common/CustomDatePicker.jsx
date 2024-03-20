import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs from "dayjs";
import { alpha } from "@mui/material";

const CustomDatePicker = ({
  required,
  label,
  name,
  size,
  format,
  readOnly,
  disablePast,
  disableFuture,
  value,
  onChange,
  style,
  variant,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        required={required}
        label={label}
        name={name}
        size={size ?? "small"}
        format={format ?? "DD/MM/YYYY"}
        readOnly={readOnly ?? false}
        disablePast={disablePast ?? false}
        disableFuture={disableFuture ?? false}
        value={value}
        onChange={onChange}
        sx={{
          ...style,
        }}
        slotProps={{
          textField: {
            size: "small",
            required: required,
            fullWidth: true,
            color: "secondary",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
