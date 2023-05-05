import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const HSelect = ({ label, value, onChange, items, required, sx }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        required={required}
        onChange={onChange}
        sx={sx}
      >
        {items &&
          items.map((v, i) => {
            return (
              <MenuItem key={i} value={v}>
                {v}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default HSelect;
