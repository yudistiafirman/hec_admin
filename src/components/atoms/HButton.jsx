import { Button } from "@mui/material";
import React from "react";

const HButton = ({ variant, title, onClick, startIcon, endIcon }) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      variant={variant}
    >
      {title}
    </Button>
  );
};

export default HButton;
