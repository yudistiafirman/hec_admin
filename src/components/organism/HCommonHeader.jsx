import { Box, Typography } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import InfoBox from "../molecules/InfoBox";
import HSelect from "../atoms/HSelect";
import HTextField from "../atoms/HTextField";
import HButton from "../atoms/HButton";
import AddIcon from "@mui/icons-material/Add";
const HCommonHeaders = ({
  headerTitle,
  selectTitle,
  infoTitle,
  searchLabel,
  total,
  onSelect,
  onChangeSearch,
  searchValue,
  selectItems,
  onAdd,
  buttonTitle,
}) => {
  return (
    <Box>
      <Typography
        sx={{ fontWeight: "500", color: "var(--text)" }}
        component="h2"
        variant="h6"
      >
        {headerTitle}
      </Typography>
      <HSpacer size="extraLarge" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InfoBox title={infoTitle} total={total} />
        <HSpacer size="large" />
        <Box sx={{ flex: 0.3, alignSelf: "flex-end" }}>
          <HSelect
            onChange={onSelect}
            label={selectTitle}
            items={selectItems}
          />
        </Box>
        <HSpacer size="large" />
        <Box sx={{ alignSelf: "flex-end", flex: 0.5 }}>
          <HTextField
            onChange={onChangeSearch}
            value={searchValue}
            label={searchLabel}
            needSearchicon
          />
        </Box>
        <Box
          sx={{
            alignSelf: "flex-end",
            flex: 0.2,
          }}
        >
          <HButton
            startIcon={<AddIcon />}
            onClick={onAdd}
            variant="contained"
            title={buttonTitle}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HCommonHeaders;
