import React from "react";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import HAddImageDesc from "../../components/templates/HAddImageDesc";
import HBackContinueButton from "../../components/molecules/HBackContinueButton";
import { useAddDataStore } from "../../stores/useAddDataStore";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { STATUS } from "../../constant";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { postTrainingGallery } from "../../asyncActions/TrainingGalleryActions";

const AddTrainingGallery = () => {
  const [
    image,
    status,
    name,
    onChangeName,
    onChangeFile,
    reset,
    onChangeStatus,
  ] = useAddDataStore((state) => [
    state.image,
    state.status,
    state.name,
    state.onChangeName,
    state.onChangeFile,
    state.reset,
    state.onChangeStatus,
  ]);

  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
  const navigate = useNavigate();

  const postNewTrainingGallery = async () => {
    try {
      setBackdrop(true);
      const data = new FormData();
      const statusToPost = STATUS.filter((v) => v.id === status);
      data.append("name", name);
      data.append("file", image);
      data.append("status", statusToPost[0].category_name);

      const response = await postTrainingGallery(data);
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        reset();
        navigate("/training-gallery");
      }
    } catch (error) {
      console.log("ini error", error);
      setBackdrop(false);
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const handleNext = () => {
    postNewTrainingGallery();
  };

  const handleBack = () => {
    navigate("/training-gallery");
  };

  const handleDisabled = () => {
    return image === null || name === "" || status === "";
  };

  return (
    <HecContainer>
      <HSpacer size="extraLarge" />
      <HAddImageDesc
        imageFile={image}
        onChangeFile={onChangeFile}
        multiline
        rows={5}
        name={name}
        nameLabel="Judul Gambar"
        onChangeName={onChangeName}
        statusValue={status}
        statuslabel="status"
        onChangeStatus={onChangeStatus}
        statusItems={STATUS}
      />
      ,
      <HSpacer size="extraLarge" />
      <Box sx={{ position: "relative", bottom: 10 }}>
        <HBackContinueButton
          onBack={handleBack}
          disabled={handleDisabled()}
          onNext={handleNext}
        />
      </Box>
    </HecContainer>
  );
};

export default AddTrainingGallery;
