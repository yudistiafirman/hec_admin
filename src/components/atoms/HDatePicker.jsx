import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const HDatePicker = ({ label, onChangeDate, dateValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        required
        label={label}
        onChange={onChangeDate}
        value={dateValue}
        defaultValue={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default HDatePicker;
