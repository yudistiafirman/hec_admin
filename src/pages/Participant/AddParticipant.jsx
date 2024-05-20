import React, { useEffect } from "react";
import { useAddDataStore } from "../../stores/useAddDataStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useNavigate } from "react-router-dom";
import HecContainer from "../../components/atoms/HContainer";
import HSpacer from "../../components/atoms/HSpacer";
import { Box, Typography } from "@mui/material";
import { createParticipant } from "../../asyncActions/ParticipateActions";
import HBackContinueButton from "../../components/molecules/HBackContinueButton";
import HAddParticipant from "../../components/templates/HAddParticipant";
import regex from "../../constant/regex";
import dayjs from "dayjs";

const AddParticipant = () => {
	const [
		nis,
		name,
		email,
		phoneNumber,
		address,
		dateValue,
		image,
		onChangeNis,
		onChangeName,
		onChangeEmail,
		onChangePhoneNumber,
		onChangeAddress,
		onChangeDate,
		onChangeFile,
		reset,
	] = useAddDataStore((state) => [
		state.nis,
		state.name,
		state.email,
		state.phoneNumber,
		state.address,
		state.dateValue,
		state.image,
		state.onChangeNis,
		state.onChangeName,
		state.onChangeEmail,
		state.onChangePhoneNumber,
		state.onChangeAddress,
		state.onChangeDate,
		state.onChangeFile,
		state.reset,
	]);

	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);
	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);

	const navigate = useNavigate();

	useEffect(() => {
		return () => reset();
	}, []);

	const createNewParticipant = async () => {
		try {
			setBackdrop(true);
			const data = new FormData();
			data.append("file", image);
			data.append("participantName", name);
			data.append("email", email);
			data.append("phoneNumber", phoneNumber);
			data.append("address", address);
			data.append("register_date", dayjs(dateValue).format());
			data.append("NIS", nis);

			const response = await createParticipant(data);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				reset();
				navigate("/participant");
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
		createNewParticipant();
	};

	const handleBack = () => {
		navigate("/participant");
	};

	const handleDisabled = () => {
		return (
			image === null ||
			email === "" ||
			name === "" ||
			nis === "" ||
			!regex.email.test(email)
		);
	};

	return (
		<HecContainer>
			<Typography
				sx={{ fontWeight: "500", color: "var(--text)" }}
				component="h2"
				variant="h6"
			>
				Tambah Peserta
			</Typography>
			<HSpacer size="extraLarge" />
			<HAddParticipant
				imageFile={image}
				onChangeFile={onChangeFile}
				name={name}
				nameLabel="Nama Peserta"
				onChangeName={onChangeName}
				nis={nis}
				nisLabel="NIS Peserta"
				onChangeNis={onChangeNis}
				address={address}
				addressLabel="Alamat Peserta"
				onChangeAddress={onChangeAddress}
				phoneNumber={phoneNumber}
				phoneNumberLabel="No HP Peserta"
				onChangePhoneNumber={onChangePhoneNumber}
				registerDate={dateValue}
				registerDateLabel="Tanggal Pendaftaran Peserta"
				onChangeRegisterDate={onChangeDate}
				email={email}
				emailLabel="Email Peserta"
				onChangeEmail={onChangeEmail}
			/>
			<HSpacer size="extraLarge" />

			<Box sx={{ position: "relative", bottom: 0 }}>
				<HBackContinueButton
					onBack={handleBack}
					disabled={handleDisabled()}
					onNext={handleNext}
				/>
			</Box>
		</HecContainer>
	);
};

export default AddParticipant;
