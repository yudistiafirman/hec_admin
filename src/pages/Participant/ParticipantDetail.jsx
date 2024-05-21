import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import {
	createCertificate,
	deleteCertificate,
	editCertificate,
	getOneParticipant,
} from "../../asyncActions/ParticipateActions";
import { CircularProgress } from "@mui/material";
import HParticipantDetail from "../../components/templates/HParticipantDetail";
import HSpacer from "../../components/atoms/HSpacer";
import { useBackdropStore } from "../../stores/useBackdropStore";
import HCommonContent from "../../components/templates/HCommonContent";
import { CERTIFICATE_TABLE_HEAD_CELLS } from "../../constant";
import HecContainer from "../../components/atoms/HContainer";
import AddCertificatesDialog from "../../components/templates/Dialog/AddCertificateDialog";
import EditCertificateDialog from "../../components/templates/Dialog/EditCertificateDialog";

const ParticipantDetail = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState(null);
	const [selected, setSelected] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [certificateNumber, setCertificateNumber] = useState("");
	const [trainingName, setTrainingName] = useState("");
	const [batchValue, setBatchValue] = useState("");
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [certificateNumberEditValue, setCertificateNumberEditValue] =
		useState("");
	const [trainingNameEditValue, setTrainingNameEditValue] = useState("");
	const [batchEditValue, setBatchEditValue] = useState("");
	const [selectedCertificate, setSelectedCerificate] = useState(null);

	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);

	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const { participantId } = params;

	useEffect(() => {
		getParticipantDetail();
	}, [participantId]);

	useEffect(() => {
		const hasDataChanged =
			Number(certificateNumberEditValue) !==
				Number(selectedCertificate?.number) ||
			trainingNameEditValue !== selectedCertificate?.training_name ||
			batchEditValue !== selectedCertificate?.batch;

		setIsDataChanged(hasDataChanged);
	}, [certificateNumberEditValue, trainingNameEditValue, batchEditValue]);

	const onClickEdit = (selected) => {
		const certificateId = selected[0];

		const selectedCertificate = details?.certificates.filter(
			(v) => v.id === certificateId
		);

		setSelectedCerificate(selectedCertificate[0]);
		setCertificateNumberEditValue(selectedCertificate[0].number);
		setTrainingNameEditValue(selectedCertificate[0].training_name);
		setBatchEditValue(selectedCertificate[0].batch);
		setOpenEditDialog(true);
	};

	const editCertificates = async () => {
		try {
			setBackdrop(true);
			const payload = {};
			if (certificateNumberEditValue) {
				payload.certificateNumber = certificateNumberEditValue;
			}
			if (batchEditValue) {
				payload.batch = batchEditValue;
			}
			if (trainingNameEditValue) {
				payload.trainingName = trainingNameEditValue;
			}

			const response = await editCertificate(
				selectedCertificate.id,
				payload
			);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				setSelected([]);
				getParticipantDetail();
				setOpenEditDialog(false);
				setCertificateNumberEditValue("");
				setTrainingNameEditValue("");
				setBatchEditValue("");
			}
		} catch (error) {
			setBackdrop(false);
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message:
					error?.response?.data?.message ?? "Something went wrong",
			});
		}
	};
	const onDeleteCertificates = async (selected) => {
		try {
			setBackdrop(true);
			const payload = {
				certificateIds: selected,
			};
			const response = await deleteCertificate(payload);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				setSelected([]);
				getParticipantDetail();
			}
		} catch (error) {
			setBackdrop(false);
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message:
					error?.response?.data?.message ?? "Something went wrong",
			});
		}
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleSelectAllClick = (event, rows) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	const isSelected = (id) => selected.indexOf(id) !== -1;

	const getParticipantDetail = async () => {
		try {
			setLoading(true);
			const response = await getOneParticipant(participantId);
			if (response.data.success) {
				setLoading(false);
				setDetails(response.data.data);
			}
		} catch (error) {
			setLoading(false);
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message: error.response.data.message,
			});
		}
	};

	const createNewCertificate = async () => {
		try {
			setBackdrop(true);
			const data = {
				certificateNumber,
				trainingName,
				batch: batchValue,
			};

			const response = await createCertificate(participantId, data);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				setOpenDialog(false);
				setCertificateNumber("");
				setTrainingName("");
				setBatchValue("");
				getParticipantDetail();
			}
		} catch (error) {
			setBackdrop(false);
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message: error?.response?.data?.message,
			});
		}
	};

	const handleDisable = () => {
		return (
			certificateNumber === "" || batchValue === "" || trainingName === ""
		);
	};

	const handleEditDisable = () => {
		return (
			certificateNumberEditValue === "" ||
			batchEditValue === "" ||
			trainingNameEditValue === ""
		);
	};

	if (loading) {
		return <CircularProgress size={50} sx={{ margin: "auto" }} />;
	}

	return (
		details !== null && (
			<HecContainer>
				<HParticipantDetail
					getParticipantDetail={getParticipantDetail}
					participantId={details.id}
					image={details.participant_photo}
					address={details.address}
					participantName={details.name}
					email={details.email}
					phoneNumber={details.phone_number}
					registerDate={details.register_date}
					nis={details.NIS}
				/>
				<HSpacer size="extraLarge" />
				<HCommonContent
					headerTitle="Sertifikat Peserta"
					infoTitle="Total Sertifikat"
					total={details?.certificates?.length}
					onDelete={onDeleteCertificates}
					hideSearch
					hideDetailButton
					buttonTitle="Tambah"
					onAdd={() => setOpenDialog(true)}
					headCells={CERTIFICATE_TABLE_HEAD_CELLS}
					hidePagination
					selected={selected}
					handleSelectAllClick={handleSelectAllClick}
					isSelected={isSelected}
					handleClick={handleClick}
					hideStatus
					rows={details?.certificates}
					showEditButton
					onClickEdit={(selected) => onClickEdit(selected)}
				/>
				<AddCertificatesDialog
					open={openDialog}
					handleClose={() => setOpenDialog(false)}
					onSubmit={createNewCertificate}
					disabled={handleDisable()}
					certificateNumberValue={certificateNumber}
					onChangeCertificateNumber={(e) =>
						setCertificateNumber(e.target.value)
					}
					trainingNameValue={trainingName}
					onChangeTrainingName={(e) =>
						setTrainingName(e.target.value)
					}
					batchValue={batchValue}
					onChangeBatch={(e) => setBatchValue(e.target.value)}
				/>
				<EditCertificateDialog
					open={openEditDialog}
					handleClose={() => setOpenEditDialog(false)}
					onSubmit={editCertificates}
					disabled={!isDataChanged || handleEditDisable()}
					certificateNumberEditValue={certificateNumberEditValue}
					onChangeCertificateNumberEditValue={(e) =>
						setCertificateNumberEditValue(e.target.value)
					}
					trainingNameEditValue={trainingNameEditValue}
					onChangeTrainingNameEditValue={(e) =>
						setTrainingNameEditValue(e.target.value)
					}
					batchEditValue={batchEditValue}
					onChangeBatchEditValue={(e) =>
						setBatchEditValue(e.target.value)
					}
				/>
			</HecContainer>
		)
	);
};

export default ParticipantDetail;
