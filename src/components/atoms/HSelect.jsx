import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const HSelect = ({ label, value, onChange, items }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        sx={{
          backgroundColor: "var(--off-white)",
        }}
      >
        {items.map((v, i) => {
          return (
            <MenuItem key={i} value={10}>
              {v}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default HSelect;
