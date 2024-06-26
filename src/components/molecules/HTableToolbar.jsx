import { Box, Chip, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import HSpacer from "../atoms/HSpacer";
import { EditNote } from "@mui/icons-material";

const HTableToolbar = ({
	numSelected,
	onClickDetail,
	onDelete,
	status,
	hideStatus,
	hideDetailButton,
	onChangeStatus,
	isFull,
	onChangeIsFull,
	onChangeIsPopular,
	isPopular,
	showEditButton,
	onClickEdit,
}) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 && (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} terpilih
				</Typography>
			)}
			{numSelected === 1 && isPopular && (
				<Tooltip
					title={
						isPopular.length > 0 && isPopular[0].isPopular === 0
							? "Jadikan Pelatihan Populer"
							: "Jadikan Pelatihan Biasa "
					}
				>
					<Chip
						label={
							isPopular.length > 0 && isPopular[0].isPopular === 0
								? "Jadikan Pelatihan Populer"
								: "Jadikan Pelatihan Biasa "
						}
						color="default"
						onClick={onChangeIsPopular}
					/>
				</Tooltip>
			)}
			<HSpacer size="small" />
			{numSelected === 1 && isFull && (
				<Tooltip title="Ganti Ketersediaan">
					<Chip
						label="Ganti Ketersediaan"
						color={
							isFull.length > 0 && isFull[0].isFull === 1
								? "info"
								: "error"
						}
						onClick={onChangeIsFull}
					/>
				</Tooltip>
			)}

			<HSpacer size="small" />

			{numSelected > 0 && (
				<Box sx={{ display: "flex" }}>
					{numSelected === 1 && !hideStatus && (
						<Tooltip title="Ganti Status">
							<Chip
								label="Ganti Status"
								color={
									status.length > 0 &&
									status[0].status_name === "DRAFT"
										? "success"
										: "primary"
								}
								onClick={onChangeStatus}
							/>
						</Tooltip>
					)}
					<HSpacer size="small" />
					{numSelected === 1 && !hideDetailButton && (
						<Tooltip title="Lihat Detail">
							<Chip
								icon={<FindInPageIcon />}
								label="Lihat Detail"
								color="info"
								onClick={onClickDetail}
							/>
						</Tooltip>
					)}
					{numSelected === 1 && showEditButton && (
						<Tooltip title="Lihat Detail">
							<Chip
								icon={<EditNote />}
								label="Edit"
								color="info"
								onClick={onClickEdit}
							/>
						</Tooltip>
					)}

					<HSpacer size="small" />
					<Tooltip title="Hapus">
						<Chip
							onClick={onDelete}
							icon={<DeleteIcon />}
							label="Hapus"
							color="error"
						/>
					</Tooltip>
				</Box>
			)}
		</Toolbar>
	);
};

export default HTableToolbar;
