import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HTextField from "../atoms/HTextField";
import HSpacer from "../atoms/HSpacer";
import HUploadButton from "../atoms/HUploadButton";
import HEmptyImage from "../atoms/HEmptyImage";
import HAddedImage from "../atoms/HAddedImage";

const HAddImageDesc = ({
  imageFile,
  onChangeFile,
  descLabel,
  multiline,
  onChangeDesc,
  rows,
  descValue,
  name,
  nameLabel,
  onChangeName,
}) => {
  const [preview, setPreview] = useState(undefined);

  useEffect(() => {
    if (!imageFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);
  return (
    <>
      <Box>
        <HTextField value={name} label={nameLabel} onChange={onChangeName} />
      </Box>
      <HSpacer size="extraLarge" />
      <Box>
        {imageFile ? <HAddedImage image={preview} /> : <HEmptyImage />}

        <HSpacer size="large" />
        <HUploadButton
          onChangeFile={onChangeFile}
          title={imageFile ? "Ganti Gambar" : "Tambahkan Gambar"}
          accept="image/*"
        />
      </Box>
      <HSpacer size="extraLarge" />

      <HTextField
        label={descLabel}
        multiline={multiline}
        required
        value={descValue}
        onChange={onChangeDesc}
        rows={rows}
        sx={{ width: "100%" }}
      />
    </>
  );
};

export default HAddImageDesc;
