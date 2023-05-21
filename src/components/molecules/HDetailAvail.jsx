import { Chip, Typography } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";

const HDetailAvail = ({ title, detail, color }) => {
  return (
    <>
      <Typography
        sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
        component="h2"
        variant="subtitle1"
      >
        {title}
      </Typography>
      <HSpacer size="small" />
      <Chip color={color} label={detail} />
    </>
  );
};

export default HDetailAvail;
