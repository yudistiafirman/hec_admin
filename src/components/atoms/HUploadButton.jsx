import { Button } from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const HUploadButton = ({ title, accept, onChangeFile }) => {
  return (
    <Button
      component="label"
      startIcon={<AddPhotoAlternateIcon />}
      variant="contained"
    >
      {title}
      <input onChange={onChangeFile} hidden accept={accept} type="file" />
    </Button>
  );
};

export default HUploadButton;
