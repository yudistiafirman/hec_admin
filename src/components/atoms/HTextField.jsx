import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const HTextField = ({
  label,
  value,
  onChange,
  multiline,
  rows,
  required,
  sx,
  inputMode,
  icon,
  placeHolder,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      sx={sx}
      multiline={multiline}
      rows={rows}
      inputMode={inputMode}
      required={required}
      onChange={onChange}
      id="standard-start-adornment"
      placeholder={placeHolder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};

export default HTextField;
