import { Typography } from "@mui/material";
import React from "react";

const HDetailText = ({ title, detail }) => {
  return (
    <>
      <Typography
        sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
        component="h2"
        variant="subtitle1"
      >
        {title}
      </Typography>
      <Typography
        sx={{ fontWeight: "500", color: "var(--text)" }}
        component="h2"
        variant="subtitle1"
      >
        {detail}
      </Typography>
    </>
  );
};

export default HDetailText;
