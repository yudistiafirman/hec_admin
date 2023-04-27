import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const HTextField = ({ label, needSearchicon, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      id="standard-start-adornment"
      InputProps={
        needSearchicon && {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }
      }
      variant="outlined"
    />
  );
};

export default HTextField;
