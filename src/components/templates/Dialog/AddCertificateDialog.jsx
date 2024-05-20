import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import HSpacer from "../../atoms/HSpacer";

const AddCertificatesDialog = ({
	open,
	handleClose,
	onSubmit,
	disabled,
	certificateNumberValue,
	onChangeCertificateNumber,
	trainingNameValue,
	onChangeTrainingName,
	batchValue,
	onChangeBatch,
}) => {
	return (
		<Dialog fullWidth open={open} onClose={handleClose}>
			<DialogTitle>Tambah Peserta</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					required
					margin="dense"
					label="No Sertifikat"
					value={certificateNumberValue}
					onChange={onChangeCertificateNumber}
					fullWidth
					variant="outlined"
				/>
				<HSpacer size="large" />
				<TextField
					autoFocus
					required
					margin="dense"
					label="Nama Pelatihan"
					value={trainingNameValue}
					onChange={onChangeTrainingName}
					fullWidth
					variant="outlined"
				/>
				<HSpacer size="large" />
				<TextField
					autoFocus
					required
					margin="dense"
					label="Batch"
					value={batchValue}
					onChange={onChangeBatch}
					fullWidth
					variant="outlined"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Batal</Button>
				<Button onClick={onSubmit} disabled={disabled}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddCertificatesDialog;
