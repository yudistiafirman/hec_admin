import React from "react";
import HStepper from "../../components/molecules/HStepper";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import HAddImageDesc from "../../components/templates/HAddImageDesc";
import HBackContinueButton from "../../components/molecules/HBackContinueButton";
import { useAddDataStore } from "../../stores/useAddDataStore";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  CAREER_STEPPER_LABEL,
  CAREER_TYPE,
  SALARY_RANGE,
  STATUS,
} from "../../constant";
import HCommonAddDetail from "../../components/templates/HCommonAddDetail";

const AddCareer = () => {
  const [
    step,
    image,
    description,
    firstSection,
    secondSection,
    dateValue,
    employmentType,
    salaryRange,
    jobCategory,
    status,
    jobStatus,
    jobLocation,
    increaseStep,
    decreaseStep,
    onChangeFile,
    onChangeDesc,
    onAddFirstSection,
    onRemoveFirstSection,
    onAddSecondSection,
    onRemoveSecondSection,
    onChangeFirstSection,
    onChangeSecondSection,
    onChangeDate,
    onChangeEmploymentType,
    onChangeSalaryRange,
    onChangeJobCategory,
    onChangeStatus,
    onChangeJobLocation,
  ] = useAddDataStore((state) => [
    state.step,
    state.image,
    state.description,
    state.firstSection,
    state.secondSection,
    state.dateValue,
    state.employmentType,
    state.salaryRange,
    state.jobCategory,
    state.status,
    state.jobState,
    state.jobLocation,
    state.increaseStep,
    state.decreaseStep,
    state.onChangeFile,
    state.onChangeDesc,
    state.onAddFirstSection,
    state.onRemoveFirstSection,
    state.onAddSecondSection,
    state.onRemoveSecondSection,
    state.onChangeFirstSection,
    state.onChangeSecondSection,
    state.onChangeDate,
    state.onChangeEmploymentType,
    state.onChangeSalaryRange,
    state.onChangeJobCategory,
    state.onChangeStatus,
    state.onChangeJobLocation,
  ]);

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === stepsToRender.length - 1) {
      alert("step terakhir");
    } else {
      increaseStep();
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/career");
    } else {
      decreaseStep();
    }
  };

  const handleDisabled = () => {
    if (step === 0) {
      return image === null || description.length === 0;
    } else if (step === 1) {
      const firstSectionHasNoValue = firstSection.filter((v) => v.value === "");
      const secondSectionHasNoValue = secondSection.filter(
        (v) => v.value === ""
      );

      return (
        firstSectionHasNoValue.length > 0 ||
        secondSectionHasNoValue.length > 0 ||
        dateValue === "" ||
        employmentType === "" ||
        salaryRange === "" ||
        jobCategory === "" ||
        status === "" ||
        jobStatus === ""
      );
    }
    return false;
  };

  const stepsToRender = [
    <HAddImageDesc
      imageFile={image}
      onChangeFile={onChangeFile}
      descLabel="Deskripsi Pekerjaan"
      multiline
      descValue={description}
      rows={5}
      onChangeDesc={onChangeDesc}
    />,
    <HCommonAddDetail
      firstSectionList={firstSection}
      secondSectionList={secondSection}
      onAddFirstSection={onAddFirstSection}
      onRemoveFirstSection={onRemoveFirstSection}
      onAddSecondSection={onAddSecondSection}
      onRemoveSecondSection={onRemoveSecondSection}
      onChangeFirst={onChangeFirstSection}
      onChangeSecond={onChangeSecondSection}
      dateValue={dateValue}
      dateLabel="Tanggal Penyerahan Terakhir"
      onChangeDate={onChangeDate}
      typeItems={CAREER_TYPE}
      typeValue={employmentType}
      onChangeType={onChangeEmploymentType}
      typeTitle="Tipe Pekerjaan"
      salaryLabel="Kisaran Gaji"
      salaryValue={salaryRange}
      salaryItems={SALARY_RANGE}
      onChangeSalary={onChangeSalaryRange}
      locationValue={jobLocation}
      onChangeLocation={onChangeJobLocation}
      locationLabel="Lokasi Pekerjaan"
      categoryLabel="Kategori Pekerjaan"
      categoryValue={jobCategory}
      onChangeCategory={onChangeJobCategory}
      statusItems={STATUS}
      statusValue={status}
      onChangeStatus={onChangeStatus}
      statusLabel="Status"
    />,
  ];

  return (
    <HecContainer>
      <HStepper steps={CAREER_STEPPER_LABEL} activeStep={step} />
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

export default AddCareer;
