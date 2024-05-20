import React, { useEffect } from "react";
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
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { getCategories } from "../../asyncActions/jobActions";
import { postJob } from "../../asyncActions/jobActions";
import { useBackdropStore } from "../../stores/useBackdropStore";
import dayjs from "dayjs";

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
		category,
		status,
		jobLocation,
		categoryData,
		textCategory,
		name,
		onChangeName,
		onChangeCategoryData,
		onChangeTextCategory,
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
		onChangeCategory,
		onChangeStatus,
		onChangeJobLocation,
		reset,
	] = useAddDataStore((state) => [
		state.step,
		state.image,
		state.description,
		state.firstSection,
		state.secondSection,
		state.dateValue,
		state.employmentType,
		state.salaryRange,
		state.category,
		state.status,
		state.jobLocation,
		state.categoryData,
		state.textCategory,
		state.name,
		state.onChangeName,
		state.onChangeCategoryData,
		state.onChangeTextCategory,
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
		state.onChangeCategory,
		state.onChangeStatus,
		state.onChangeJobLocation,
		state.reset,
	]);

	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);
	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
	const navigate = useNavigate();

	useEffect(() => {
		getJobCategoryData();

		return () => reset();
	}, []);

	const getJobCategoryData = async () => {
		try {
			const response = await getCategories();
			onChangeCategoryData(response.data.data);
		} catch (error) {
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message: error.response.data.message,
			});
		}
	};

	const postNewJob = async () => {
		try {
			setBackdrop(true);
			const data = new FormData();

			const responsibility = firstSection.map((v) => v.value);
			const requirement = secondSection.map((v) => v.value);
			const salaryRangeToPost = SALARY_RANGE.filter(
				(v) => v.id === salaryRange
			);
			const jobType = CAREER_TYPE.filter((v) => v.id === employmentType);
			const statusToPost = STATUS.filter((v) => v.id === status);
			const jobCategoryToPost = categoryData.filter(
				(v) => v.id === category
			);
			data.append("jobName", name);
			data.append("file", image);
			data.append("description", description);
			data.append("location", jobLocation);
			data.append("salaryRange", salaryRangeToPost[0].category_name);
			data.append("status", statusToPost[0].category_name);
			data.append("last_submission", dayjs(dateValue).format());
			data.append("jobType", jobType[0].category_name);
			data.append("requirement[]", requirement);
			data.append("responsibility[]", responsibility);
			if (category !== "") {
				data.append("jobCategory", jobCategoryToPost[0].category_name);
			} else {
				data.append("jobCategory", textCategory);
			}

			const response = await postJob(data);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				reset();
				navigate("/");
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
		if (step === stepsToRender.length - 1) {
			postNewJob();
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
			return image === null || description.length === 0 || name === "";
		} else if (step === 1) {
			const firstSectionHasNoValue = firstSection.filter(
				(v) => v.value === ""
			);
			const secondSectionHasNoValue = secondSection.filter(
				(v) => v.value === ""
			);

			if (firstSectionHasNoValue.length > 0) {
				return true;
			}
			if (secondSectionHasNoValue.length > 0) {
				return true;
			}

			if (dateValue === "") {
				return true;
			}

			if (employmentType === "") {
				return true;
			}
			if (salaryRange === "") {
				return true;
			}

			if (category === "" && textCategory === "") {
				return true;
			}
			if (status === "") {
				return true;
			}
			if (jobLocation === "") {
				return true;
			}
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
			name={name}
			nameLabel="Nama Pekerjaan"
			onChangeName={onChangeName}
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
			categoryTextLabel="Tambah Kategori Pekerjaan"
			categoryValue={category}
			categoryItems={categoryData}
			categoryTextValue={textCategory}
			onChangeCategoryText={onChangeTextCategory}
			onChangeCategory={onChangeCategory}
			statusItems={STATUS}
			statusValue={status}
			onChangeStatus={onChangeStatus}
			statusLabel="Status"
		/>,
	];
	console.log(jobLocation);
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
