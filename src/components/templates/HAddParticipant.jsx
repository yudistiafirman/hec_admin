import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HTextField from "../atoms/HTextField";
import HAddedImage from "../atoms/HAddedImage";
import HSpacer from "../atoms/HSpacer";
import HUploadButton from "../atoms/HUploadButton";
import HDatePicker from "../atoms/HDatePicker";
import HEmptyImage from "../atoms/HEmptyImage";
import regex from "../../constant/regex";

const HAddParticipant = ({
	imageFile,
	onChangeFile,
	name,
	nameLabel,
	onChangeName,
	nis,
	nisLabel,
	onChangeNis,
	address,
	addressLabel,
	onChangeAddress,
	phoneNumber,
	phoneNumberLabel,
	onChangePhoneNumber,
	registerDate,
	registerDateLabel,
	onChangeRegisterDate,
	email,
	emailLabel,
	onChangeEmail,
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
		<Box sx={{ display: "flex", justifyContent: "space-between" }}>
			<Box sx={{ flex: 0.5 }}>
				{imageFile ? <HAddedImage image={preview} /> : <HEmptyImage />}

				<HSpacer size="large" />
				<HUploadButton
					onChangeFile={onChangeFile}
					title={
						imageFile
							? "Ganti Photo Peserta"
							: "Tambahkan Photo Peserta"
					}
					accept="image/*"
				/>
				<HSpacer size="extraLarge" />
				<HTextField
					sx={{ width: "60%" }}
					required
					value={name}
					label={nameLabel}
					onChange={onChangeName}
				/>
				<HSpacer size="extraLarge" />
				<HTextField
					sx={{ width: "50%" }}
					required
					value={nis}
					label={nisLabel}
					onChange={onChangeNis}
				/>
				<HSpacer size="extraLarge" />
				<HTextField
					sx={{ width: "60%" }}
					required
					error={email !== "" && !regex.email.test(email)}
					value={email}
					label={emailLabel}
					onChange={onChangeEmail}
				/>
			</Box>
			<Box sx={{ flex: 0.5 }}>
				<HDatePicker
					label={registerDateLabel}
					dateValue={registerDate}
					onChangeDate={onChangeRegisterDate}
				/>
				<HSpacer size="extraLarge" />
				<HTextField
					sx={{ width: "60%" }}
					value={phoneNumber}
					label={phoneNumberLabel}
					onChange={onChangePhoneNumber}
				/>
				<HSpacer size="extraLarge" />
				<HTextField
					sx={{ width: "60%" }}
					multiline
					rows={6}
					value={address}
					label={addressLabel}
					onChange={onChangeAddress}
				/>
				<HSpacer size="extraLarge" />
			</Box>
		</Box>
	);
};

export default HAddParticipant;
