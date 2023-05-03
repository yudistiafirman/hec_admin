import { Chip, Typography } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";

const HDetailStatus = ({ title, detail }) => {
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
      <Chip
        color={detail === "PUBLISHED" ? "success" : "primary"}
        label={detail}
      />
    </>
  );
};

export default HDetailStatus;
