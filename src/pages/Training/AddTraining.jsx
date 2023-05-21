import React, { useEffect } from "react";
import HStepper from "../../components/molecules/HStepper";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import HAddImageDesc from "../../components/templates/HAddImageDesc";
import HBackContinueButton from "../../components/molecules/HBackContinueButton";
import { useAddDataStore } from "../../stores/useAddDataStore";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { STATUS, TRAINING_STEPPER_LABEL } from "../../constant";
import HCommonAddDetail from "../../components/templates/HCommonAddDetail";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import {
  getTrainingCategories,
  postTraining,
} from "../../asyncActions/TrainingActions";
import { postJob } from "../../asyncActions/jobActions";
import { useBackdropStore } from "../../stores/useBackdropStore";
import dayjs from "dayjs";

const AddTraining = () => {
  const [
    step,
    image,
    description,
    dateValue,
    category,
    status,
    categoryData,
    textCategory,
    name,
    plusValues,
    endDateValue,
    onChangeEndDate,
    onAddPlusValues,
    onRemovePlusValues,
    onChangePlusValues,
    onChangeName,
    onChangeCategoryData,
    onChangeTextCategory,
    increaseStep,
    decreaseStep,
    onChangeFile,
    onChangeDesc,
    onChangeDate,
    onChangeCategory,
    onChangeStatus,
    reset,
  ] = useAddDataStore((state) => [
    state.step,
    state.image,
    state.description,
    state.dateValue,
    state.category,
    state.status,
    state.categoryData,
    state.textCategory,
    state.name,
    state.plusValues,
    state.endDateValue,
    state.onChangeEndDate,
    state.onAddPlusValues,
    state.onRemovePlusValues,
    state.onChangePlusValues,
    state.onChangeName,
    state.onChangeCategoryData,
    state.onChangeTextCategory,
    state.increaseStep,
    state.decreaseStep,
    state.onChangeFile,
    state.onChangeDesc,
    state.onChangeDate,
    state.onChangeCategory,
    state.onChangeStatus,
    state.reset,
  ]);

  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);

  const navigate = useNavigate();

  useEffect(() => {
    getTrainingCategoryData();
  }, []);

  const getTrainingCategoryData = async () => {
    try {
      const response = await getTrainingCategories();
      onChangeCategoryData(response.data.data);
    } catch (error) {
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const postNewTraining = async () => {
    try {
      setBackdrop(true);
      const data = new FormData();
      const plusValue = plusValues.map((v) => v.value);
      const statusToPost = STATUS.filter((v) => v.id === status);
      const trainingCategoryToPost = categoryData.filter(
        (v) => v.id === category
      );
      data.append("trainingName", name);
      data.append("file", image);
      data.append("descriptions", description);
      data.append("status", statusToPost[0].category_name);
      data.append("startDate", dayjs(dateValue).format());
      data.append("endDate", dayjs(endDateValue).format());
      data.append("plusValue[]", plusValue);
      if (category !== "") {
        data.append(
          "trainingCategory",
          trainingCategoryToPost[0].category_name
        );
      } else {
        data.append("trainingCategory", textCategory);
      }

      const response = await postTraining(data);
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        reset();
        navigate("/pelatihan");
      }
    } catch (error) {
      setBackdrop(false);
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const handleNext = () => {
    if (step === stepsToRender.length - 1) {
      postNewTraining();
    } else {
      increaseStep();
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/pelatihan");
    } else {
      decreaseStep();
    }
  };

  const handleDisabled = () => {
    if (step === 0) {
      return image === null || description.length === 0 || name === "";
    } else if (step === 1) {
      const plusValuesHasNoValue = plusValues.filter((v) => v.value === "");
      if (plusValuesHasNoValue.length > 0) {
        return true;
      }
      if (dateValue === "") {
        return true;
      }
      if (endDateValue === "") {
        return true;
      }

      if (category === "" && textCategory === "") {
        return true;
      }
      if (status === "") {
        return true;
      }
    }
    return false;
  };

  const stepsToRender = [
    <HAddImageDesc
      imageFile={image}
      onChangeFile={onChangeFile}
      descLabel="Deskripsi Pelatihan"
      multiline
      descValue={description}
      rows={5}
      name={name}
      nameLabel="Nama Pelatihan"
      onChangeName={onChangeName}
      onChangeDesc={onChangeDesc}
    />,
    <HCommonAddDetail
      firstSectionList={plusValues}
      onAddFirstSection={onAddPlusValues}
      onRemoveFirstSection={onRemovePlusValues}
      onChangeFirst={onChangePlusValues}
      categoryLabel="Kategori Pelatihan"
      categoryTextLabel="Tambah Kategori Pelatihan"
      categoryValue={category}
      categoryItems={categoryData}
      categoryTextValue={textCategory}
      onChangeCategoryText={onChangeTextCategory}
      onChangeCategory={onChangeCategory}
      statusItems={STATUS}
      statusValue={status}
      onChangeStatus={onChangeStatus}
      statusLabel="Status"
      dateValue={dateValue}
      endDateValue={endDateValue}
      onChangeEndDate={onChangeEndDate}
      endDateLabel="Tanggal Berakhir Pelatihan"
      dateLabel="Tanggal Mulai Pelatihan"
      onChangeDate={onChangeDate}
    />,
  ];

  return (
    <HecContainer>
      <HStepper steps={TRAINING_STEPPER_LABEL} activeStep={step} />
      <HSpacer size="extraLarge" />

      {stepsToRender[step]}
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

export default AddTraining;
