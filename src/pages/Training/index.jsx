import React, { useEffect } from "react";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate } from "react-router-dom";
import { TRAINING_TABLE_HEAD_CELLS } from "../../constant";
import { useReadStore } from "../../stores/useReadStore";
import {
  deleteTraining,
  getAllTraining,
  getTrainingCategories,
  updateFullTraining,
  updatePopularTraining,
  updateTrainingStatus,
} from "../../asyncActions/TrainingActions";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import dayjs from "dayjs";

const Training = () => {
  const navigate = useNavigate();

  const [
    page,
    limit,
    searchQuery,
    loading,
    totalItems,
    categories,
    selectedDate,
    selectedCategories,
    data,
    setCategories,
    setSelectedCategories,
    onChangeDate,
    onChangeSearch,
    setData,
    increasePage,
    enableLoading,
    disableLoading,
  ] = useReadStore((state) => [
    state.page,
    state.limit,
    state.searchQuery,
    state.loading,
    state.totalItems,
    state.categories,
    state.selectedDate,
    state.selectedCategories,
    state.data,
    state.setCategories,
    state.setSelectedCategories,
    state.onChangeDate,
    state.onChangeSearch,
    state.setData,
    state.increasePage,
    state.enableLoading,
    state.disableLoading,
  ]);
  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const [selected, setSelected] = React.useState([]);

  const goToTrainingDetail = (selectedTraining) => {
    const trainingId = selectedTraining[0];
    navigate(`/pelatihan/detail/${trainingId}`);
  };

  useEffect(() => {
    fetchDataTraining();
  }, [page, selectedCategories, searchQuery, selected, selectedDate]);

  const fetchDataTraining = () => {
    getAllTrainingData();
    getCategoriesData();
  };

  const getAllTrainingData = async () => {
    try {
      enableLoading();
      const response = await getAllTraining(
        searchQuery,
        page === 0 ? 1 : page + 1,
        limit,
        selectedCategories,
        selectedDate ? dayjs(selectedDate).format() : selectedDate
      );
      setData(response.data);
      disableLoading();
    } catch (error) {
      disableLoading();
      console.log(error);
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await getTrainingCategories();
      const categories = [{ id: "", category_name: "Semua" }];
      categories.push(...response.data.data);

      setCategories(categories);
    } catch (error) {
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    if (newPage < data.length) {
      increasePage(newPage);
    }
  };

  const onChangeCategories = (e) => {
    setSelectedCategories(e.target.value);
    increasePage(0);
  };

  const onDelete = async (selected) => {
    try {
      setBackdrop(true);
      const payload = {
        idToDelete: selected,
      };
      const response = await deleteTraining(payload);
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
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

  const onChangeStatus = async (selected) => {
    try {
      setBackdrop(true);
      const jobId = selected[0];
      const statusValue = data.filter((v) => v.id === jobId);
      const statusToUpdate =
        statusValue[0].status_name === "DRAFT" ? "PUBLISHED" : "DRAFT";
      const response = await updateTrainingStatus(jobId, {
        status: statusToUpdate,
      });
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
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

  const onChangeIsFull = async (selected) => {
    try {
      setBackdrop(true);
      const trainingId = selected[0];
      const isFullValue = data.filter((v) => v.id === trainingId);
      const isFullToUpdate = isFullValue[0].isFull === 1 ? 0 : 1;
      const response = await updateFullTraining(trainingId, {
        isFull: isFullToUpdate.toString(),
      });
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
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

  const onChangeIsPopular = async (selected) => {
    try {
      setBackdrop(true);
      const trainingId = selected[0];
      const isPopularValue = data.filter((v) => v.id === trainingId);
      const isPopularToUpdate = isPopularValue[0].isPopular === 1 ? 0 : 1;
      const response = await updatePopularTraining(trainingId, {
        isPopular: isPopularToUpdate.toString(),
      });
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
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

  return (
    <HContainer>
      <HCommonContent
        headerTitle="Pelatihan"
        isFull
        isPopular
        infoTitle="Total Pelatihan"
        total={totalItems}
        selectTitle="Filter Kategori"
        searchLabel="Cari Pelatihan"
        dateFilterLabel="Filter Tanggal Dimulai"
        dateFilterValue={selectedDate}
        onChangeFilterDate={onChangeDate}
        onDelete={onDelete}
        onChangeSearch={onChangeSearch}
        onSelect={onChangeCategories}
        selectItems={categories}
        buttonTitle="Tambah"
        onAdd={() => navigate("/pelatihan/add")}
        headCells={TRAINING_TABLE_HEAD_CELLS}
        rowsPerPage={limit}
        page={page}
        count={totalItems}
        handleChangePage={handleChangePage}
        isLoading={loading}
        selected={selected}
        handleSelectAllClick={handleSelectAllClick}
        isSelected={isSelected}
        handleClick={handleClick}
        onChangeStatus={onChangeStatus}
        onChangeIsFull={onChangeIsFull}
        onClickDetail={(selectedTraining) =>
          goToTrainingDetail(selectedTraining)
        }
        onChangeIsPopular={onChangeIsPopular}
        rows={data}
      />
    </HContainer>
  );
};

export default Training;
