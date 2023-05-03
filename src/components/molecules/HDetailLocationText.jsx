import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HDetailLocationText = ({ title, detail }) => {
  return (
    <>
      <Typography
        sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
        component="h2"
        variant="subtitle1"
      >
        Lokasi
      </Typography>
      <Box sx={{ display: "flex" }}>
        <LocationOnIcon color="error" />
        <HSpacer size="extraSmall" />
        <Typography
          sx={{ fontWeight: "500", color: "var(--text)" }}
          component="h2"
          variant="subtitle1"
        >
          Bandung, Jawa Barat
        </Typography>
      </Box>
    </>
  );
};

export default HDetailLocationText;
