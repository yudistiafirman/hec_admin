import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import HSpacer from "../atoms/HSpacer";
import HDetailText from "../molecules/HDetailText";
import dayjs from "dayjs";
import HUploadButton from "../atoms/HUploadButton";
import { Close, EditNote, SaveAlt } from "@mui/icons-material";
import HDatePicker from "../atoms/HDatePicker";
import regex from "../../constant/regex";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { editParticipant } from "../../asyncActions/ParticipateActions";

const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_PROD
		: process.env.REACT_APP_API_URL_DEV;

const HParticipantDetail = ({
	participantId,
	image,
	address,
	participantName,
	email,
	phoneNumber,
	registerDate,
	nis,
	getParticipantDetail,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({
		image,
		participantName,
		email,
		phoneNumber,
		address,
		nis,
		registerDate,
	});
	const [imageFile, setImageFile] = useState(null);
	const [preview, setPreview] = useState(undefined);
	const [isDataChanged, setIsDataChanged] = useState(false);

	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);
	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);

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

	useEffect(() => {
		const hasDataChanged =
			imageFile !== null ||
			participantName !== editedData.participantName ||
			email !== editedData.email ||
			phoneNumber !== editedData.phoneNumber ||
			address !== editedData.address ||
			dayjs(registerDate).format("MM/DD/YYYY") !==
				dayjs(editedData.registerDate).format("MM/DD/YYYY") ||
			Number(nis) !== Number(editedData.nis);
		setIsDataChanged(hasDataChanged);
	}, [
		editedData,
		imageFile,
		image,
		participantName,
		email,
		phoneNumber,
		address,
		nis,
		registerDate,
	]);

	const handleEditToggle = () => {
		if (isEditing) {
			onEditParticipant();
		} else {
			setIsEditing(!isEditing);
		}
	};

	const onEditParticipant = async () => {
		try {
			setBackdrop(true);
			const payload = new FormData();
			if (imageFile) {
				payload.append("file", imageFile);
			}
			if (editedData.participantName) {
				payload.append("participantName", editedData.participantName);
			}
			if (editedData.email) {
				payload.append("email", editedData.email);
			}
			if (editedData.nis) {
				payload.append("NIS", editedData.nis);
			}
			if (editedData.phoneNumber) {
				payload.append("phoneNumber", editedData.phoneNumber);
			}
			if (editedData.address) {
				payload.append("address", editedData.address);
			}
			if (editedData.registerDate) {
				payload.append(
					"register_date",
					dayjs(editedData.registerDate).format()
				);
			}
			const response = await editParticipant(participantId, payload);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				getParticipantDetail();
				handleCancelEdit();
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

	const handleChange = (field, value) => {
		setEditedData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCancelEdit = () => {
		setPreview(undefined);
		setImageFile(null);
		setIsEditing(false);
		setEditedData((prev) => ({
			...prev,
			image,
			participantName,
			email,
			phoneNumber,
			address,
			nis,
			registerDate,
		}));
	};

	const handleDisableEditedValue = () => {
		return (
			editedData.email === "" ||
			editedData.nis === "" ||
			editedData.participantName === "" ||
			!regex.email.test(editedData.email)
		);
	};

	return (
		<Box
			sx={{
				backgroundColor: "var(--light)",
				padding: 2,
				borderRadius: 2,
				border: "1px solid var(--border)",
			}}
		>
			<HSpacer size="large" />
			{isEditing && (
				<>
					<HUploadButton
						title="Edit photo peserta"
						accept="image/*"
						onChangeFile={(e) => setImageFile(e.target.files[0])}
					/>
					<HSpacer size="large" />
				</>
			)}
			<Box sx={{ display: "flex", flexDirection: "row" }}>
				<img
					style={{
						borderRadius: "5px",
						border: "1px solid var(--light-grey)",
					}}
					width="30%"
					height={400}
					src={preview || `${BASE_URL}/${image}`}
					loading="lazy"
					alt="#"
				/>
				<HSpacer size="extraLarge" />
				<Box sx={{ flex: 0.5 }}>
					<HDetailText
						title="Nama Peserta"
						detail={
							isEditing ? (
								<TextField
									sx={{ width: "60%" }}
									value={editedData.participantName}
									onChange={(e) =>
										handleChange(
											"participantName",
											e.target.value
										)
									}
								/>
							) : (
								participantName
							)
						}
					/>
					<HSpacer size="large" />
					<HDetailText
						title="NIS Peserta"
						detail={
							isEditing ? (
								<TextField
									sx={{ width: "60%" }}
									value={editedData.nis}
									onChange={(e) =>
										handleChange("nis", e.target.value)
									}
								/>
							) : (
								nis
							)
						}
					/>
					<HSpacer size="large" />
					<HDetailText
						title="Email Peserta"
						detail={
							isEditing ? (
								<TextField
									sx={{ width: "60%" }}
									value={editedData.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
								/>
							) : (
								email
							)
						}
					/>
					<HSpacer size="large" />
					<HDetailText
						title="No Handphone Peserta"
						detail={
							isEditing ? (
								<TextField
									sx={{ width: "60%" }}
									value={editedData.phoneNumber}
									onChange={(e) =>
										handleChange(
											"phoneNumber",
											e.target.value
										)
									}
								/>
							) : (
								phoneNumber ?? "-"
							)
						}
					/>
					<HSpacer size="large" />
					<HDetailText
						title="Tanggal Pendaftaran"
						detail={
							isEditing ? (
								<HDatePicker
									value={editedData.registerDate}
									onChangeDate={(date) =>
										handleChange("registerDate", date)
									}
								/>
							) : (
								dayjs(registerDate).format("MM/DD/YYYY")
							)
						}
					/>
					<HSpacer size="large" />

					<HDetailText
						title="Alamat Peserta"
						detail={
							isEditing ? (
								<TextField
									sx={{ width: "90%" }}
									value={editedData.address}
									onChange={(e) =>
										handleChange("address", e.target.value)
									}
								/>
							) : (
								address ?? "-"
							)
						}
					/>
				</Box>
			</Box>
			<HSpacer size="large" />
			<Box sx={{ display: "flex" }}>
				<Button
					variant="contained"
					color="primary"
					startIcon={isEditing ? <SaveAlt /> : <EditNote />}
					onClick={handleEditToggle}
					disabled={
						(isEditing && !isDataChanged) ||
						handleDisableEditedValue()
					}
				>
					{isEditing ? "Simpan" : "Edit"}
				</Button>

				<HSpacer size="large" />
				{isEditing && (
					<Button
						variant="contained"
						color="error"
						startIcon={<Close />}
						onClick={handleCancelEdit}
					>
						Batal
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default HParticipantDetail;
