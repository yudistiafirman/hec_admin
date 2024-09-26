import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadStore } from "../../stores/useReadStore";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import {
	deleteParticipant,
	getAllParticipant,
} from "../../asyncActions/ParticipateActions";
import HCommonContent from "../../components/templates/HCommonContent";
import { PARTICIPANT_TABLE_HEAD_CELLS } from "../../constant";
import HecContainer from "../../components/atoms/HContainer";

const Participant = () => {
	const navigate = useNavigate();

	const [
		page,
		limit,
		searchQuery,
		loading,
		totalItems,
		selectedCategories,
		data,
		onChangeSearch,
		setData,
		increasePage,
		enableLoading,
		disableLoading,
		totalPage,
	] = useReadStore((state) => [
		state.page,
		state.limit,
		state.searchQuery,
		state.loading,
		state.totalItems,
		state.selectedCategories,
		state.data,
		state.onChangeSearch,
		state.setData,
		state.increasePage,
		state.enableLoading,
		state.disableLoading,
		state.totalPage,
	]);
	const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
	const [setOpenSnackbar] = useSnackBarStore((state) => [
		state.setOpenSnackbar,
	]);
	const [selected, setSelected] = React.useState([]);

	useEffect(() => {
		fetchDataParticipant();
	}, [page, searchQuery]);

	const fetchDataParticipant = () => {
		getAllParticipantData();
	};

	const getAllParticipantData = async () => {
		try {
			enableLoading();
			const response = await getAllParticipant(
				searchQuery,
				page === 0 ? 1 : page + 1,
				limit
			);

			setData(response.data);
			disableLoading();
		} catch (error) {
			disableLoading();
			setOpenSnackbar({
				openSnackbar: true,
				type: "error",
				message:
					error?.response?.data?.message ?? "Something went wrong",
			});
		}
	};

	const handleChangePage = (event, newPage) => {
		if (newPage <= totalPage) {
			increasePage(newPage);
		}
	};

	const onDelete = async (selected) => {
		try {
			setBackdrop(true);
			const payload = {
				participantIds: selected,
			};
			const response = await deleteParticipant(payload);
			if (response.data.success) {
				setBackdrop(false);
				setOpenSnackbar({
					openSnackbar: true,
					type: "success",
					message: response.data.message,
				});
				setSelected([]);
				getAllParticipantData();
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

	const goToParticipantDetail = (selectedParticipant) => {
		const participantId = selectedParticipant[0];

		navigate(`/participant/detail/${participantId}`);
	};

	const onSearchParticipant = (e) => {
		increasePage(0);
		onChangeSearch(e);
	};

	return (
		<HecContainer>
			<HCommonContent
				headerTitle="Peserta Pelatihan"
				infoTitle="Total Peserta"
				total={totalItems}
				searchLabel="Cari Peserta"
				onDelete={onDelete}
				onChangeSearch={onSearchParticipant}
				buttonTitle="Tambah"
				onAdd={() => navigate("/participant/add")}
				headCells={PARTICIPANT_TABLE_HEAD_CELLS}
				rowsPerPage={limit}
				page={page}
				count={totalItems}
				handleChangePage={handleChangePage}
				isLoading={loading}
				selected={selected}
				handleSelectAllClick={handleSelectAllClick}
				isSelected={isSelected}
				handleClick={handleClick}
				hideStatus
				onClickDetail={(selectedParticipant) =>
					goToParticipantDetail(selectedParticipant)
				}
				rows={data}
			/>
		</HecContainer>
	);
};

export default Participant;
