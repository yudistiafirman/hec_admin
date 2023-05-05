import { Typography } from "@mui/material";
import React from "react";
import HSpacer from "./HSpacer";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box } from "@mui/system";

const HUnorderedList = ({ listItemData }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <RadioButtonUncheckedIcon
        sx={{ fontSize: 12, marginTop: 0.6 }}
        color="var(--text)"
      />
      <HSpacer size="extraSmall" />
      <Typography
        sx={{ fontWeight: "500", color: "var(--text)", fontSize: 14 }}
        component="h2"
        variant="subtitle1"
      >
        {listItemData}
      </Typography>
    </Box>
  );
};

export default HUnorderedList;
