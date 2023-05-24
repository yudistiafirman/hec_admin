import { Box, TextField } from "@mui/material";
import React from "react";
import HSelect from "../atoms/HSelect";
import HSpacer from "../atoms/HSpacer";
import HTextField from "../atoms/HTextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HDatePicker from "../atoms/HDatePicker";

const HAddDetail = ({
  typeValue,
  typeTitle,
  onChangeType,
  typeItems,
  salaryValue,
  onChangeSalary,
  salaryLabel,
  salaryItems,
  categoryLabel,
  categoryValue,
  categoryItems,
  onChangeCategory,
  statusValue,
  statusLabel,
  statusItems,
  onChangeStatus,
  locationValue,
  locationLabel,
  onChangeLocation,
  onChangeDate,
  dateValue,
  dateLabel,
  onChangeEndDate,
  endDateValue,
  endDateLabel,
  categoryTextValue,
  categoryTextLabel,
  onChangeCategoryText,
}) => {
  return (
    <Box sx={{ flex: 0.4 }}>
      <HSpacer size="extraLarge" />
      {dateValue && (
        <>
          <Box>
            <HDatePicker
              label={dateLabel}
              dateValue={dateValue}
              onChangeDate={onChangeDate}
            />
          </Box>
          <HSpacer size="extraLarge" />
        </>
      )}
      {endDateValue && (
        <>
          <Box>
            <HDatePicker
              label={endDateLabel}
              dateValue={endDateValue}
              onChangeDate={onChangeEndDate}
            />
          </Box>
          <HSpacer size="extraLarge" />
        </>
      )}

      {typeItems && (
        <>
          <HSelect
            value={typeValue}
            label={typeTitle}
            onChange={onChangeType}
            items={typeItems}
          />
          <HSpacer size="extraLarge" />
        </>
      )}

      {salaryItems && (
        <>
          <Box>
            <HSelect
              value={salaryValue}
              label={salaryLabel}
              onChange={onChangeSalary}
              items={salaryItems}
            />
          </Box>
          <HSpacer size="extraLarge" />
        </>
      )}

      <Box>
        <HSelect
          value={categoryValue}
          label={categoryLabel}
          onChange={onChangeCategory}
          items={categoryItems}
        />
      </Box>
      <HSpacer size="extraLarge" />
      <Box>
        <HTextField
          value={categoryTextValue}
          label={categoryTextLabel}
          onChange={onChangeCategoryText}
        />
      </Box>
      <HSpacer size="extraLarge" />
      <Box>
        <HSelect
          value={statusValue}
          label={statusLabel}
          onChange={onChangeStatus}
          items={statusItems}
        />
      </Box>
      <HSpacer size="extraLarge" />
      {locationLabel && (
        <Box>
          <HTextField
            value={locationValue}
            sx={{ width: "100%" }}
            onChange={onChangeLocation}
            required
            placeHolder="Contoh: Bandung, Jawa Barat"
            icon={<LocationOnIcon color="error" />}
            label={locationLabel}
          />
        </Box>
      )}
    </Box>
  );
};

export default HAddDetail;
