import { Button } from "@mui/material";
import React from "react";

const HButton = ({ variant, title, onClick, startIcon, endIcon, disabled }) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default HButton;
