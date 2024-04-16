import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo } from "react";

const CustomDropdown = memo((props) => {
  const {
    placeholder,
    name,
    value,
    onChange,
    style,
    required,
    variant,
    label,
    disabled,
    readOnly,
    dropdownValues,
  } = props;

  return (
    <FormControl fullWidth required={required}>
      <InputLabel id="custom-dropdown">{label}</InputLabel>
      <Select
        labelId="custom-dropdown"
        variant={variant ? variant : "outlined"}
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        fullWidth={props?.fullWidth || true}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        sx={{ ...style }}
      >
        {dropdownValues?.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

CustomDropdown.displayName = "CustomDropdown";

export default CustomDropdown;
