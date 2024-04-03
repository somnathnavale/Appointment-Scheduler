import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { memo } from "react";
import { Box } from "@mui/material";
import moment from "moment";

const CustomDatePicker = memo((props) => {
  const {
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
  } = props;

  return (
    <Box
      sx={{
        bgcolor: "#fff !important",
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
          onChange={(val) =>
            onChange({
              target: {
                name,
                value: val,
              },
            })
          }
          defaultValue={moment()}
          slotProps={{
            textField: {
              size: size ?? "small",
              required: required,
              fullWidth: true,
              ...style
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
});

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
