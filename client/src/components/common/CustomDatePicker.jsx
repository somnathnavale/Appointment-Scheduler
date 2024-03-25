import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        bgcolor:"#fff !important",
        borderRadius: 1,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          required={required}
          label={label || ""}
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
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDatePicker;
