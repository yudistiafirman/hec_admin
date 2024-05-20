import React, { useEffect } from "react";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import HAddImageDesc from "../../components/templates/HAddImageDesc";
import HBackContinueButton from "../../components/molecules/HBackContinueButton";
import { useAddDataStore } from "../../stores/useAddDataStore";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { STATUS } from "../../constant";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { postFacility } from "../../asyncActions/FacilityActions";

const AddFacility = () => {
	const [
		image,
		description,
		status,
		name,
		onChangeName,
		onChangeFile,
		onChangeDesc,
		reset,
		onChangeStatus,
	] = useAddDataStore((state) => [
		state.image,
		state.description,
		state.status,
		state.name,
		state.onChangeName,
		state.onChangeFile,
		state.onChangeDesc,
		state.reset,
		state.onChangeStatus,
	]);

	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);
	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
	const navigate = useNavigate();

	useEffect(() => {
		return () => reset();
	}, []);

	const postNewFacility = async () => {
		try {
			setBackdrop(true);
			const data = new FormData();
			const statusToPost = STATUS.filter((v) => v.id === status);
			data.append("facilityName", name);
			data.append("file", image);
			data.append("descriptions", description);
			data.append("status", statusToPost[0].category_name);

			const response = await postFacility(data);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				reset();
				navigate("/facility");
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
		postNewFacility();
	};

	const handleBack = () => {
		navigate("/facility");
	};

	const handleDisabled = () => {
		return (
			image === null ||
			description.length === 0 ||
			name === "" ||
			status === ""
		);
	};

	return (
		<HecContainer>
			<Typography
				sx={{ fontWeight: "500", color: "var(--text)" }}
				component="h2"
				variant="h6"
			>
				Tambah Fasilitas
			</Typography>
			<HSpacer size="extraLarge" />
			<HAddImageDesc
				imageFile={image}
				onChangeFile={onChangeFile}
				descLabel="Deskripsi Fasilitas"
				multiline
				descValue={description}
				rows={5}
				name={name}
				nameLabel="Nama Fasilitas"
				onChangeName={onChangeName}
				onChangeDesc={onChangeDesc}
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

export default AddFacility;
