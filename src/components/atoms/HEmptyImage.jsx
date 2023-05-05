import { Box } from "@mui/material";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";

const HEmptyImage = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: "var(--light)",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageIcon sx={{ fontSize: 100, color: "var(--secondary-text)" }} />
    </Box>
  );
};

export default HEmptyImage;
