import { Box } from "@mui/system";
import React from "react";
import HButton from "../atoms/HButton";
import HSpacer from "../atoms/HSpacer";

const HBackContinueButton = ({ onBack, onNext, disabled }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
      }}
    >
      <HButton onClick={onBack} variant="contained" title="Kembali" />
      <HSpacer size="large" />
      <HButton
        onClick={onNext}
        disabled={disabled}
        variant="contained"
        title="Lanjutkan"
      />
    </Box>
  );
};

export default HBackContinueButton;
