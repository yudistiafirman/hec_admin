import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import HSpacer from "../../atoms/HSpacer";

const EditCertificateDialog = ({
	open,
	handleClose,
	onSubmit,
	disabled,
	certificateNumberEditValue,
	onChangeCertificateNumberEditValue,
	trainingNameEditValue,
	onChangeTrainingNameEditValue,
	batchEditValue,
	onChangeBatchEditValue,
}) => {
	return (
		<Dialog fullWidth open={open} onClose={handleClose}>
			<DialogTitle>Edit Sertifikat</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label={`No Sertifikat`}
					value={certificateNumberEditValue}
					onChange={onChangeCertificateNumberEditValue}
					fullWidth
					variant="outlined"
				/>
				<HSpacer size="large" />
				<TextField
					autoFocus
					margin="dense"
					label={`Nama Pelatihan`}
					value={trainingNameEditValue}
					onChange={onChangeTrainingNameEditValue}
					fullWidth
					variant="outlined"
				/>
				<HSpacer size="large" />
				<TextField
					autoFocus
					margin="dense"
					label={`Batch`}
					value={batchEditValue}
					onChange={onChangeBatchEditValue}
					fullWidth
					variant="outlined"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Batal</Button>
				<Button onClick={onSubmit} disabled={disabled}>
					Simpan
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditCertificateDialog;
