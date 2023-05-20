import React, { useEffect } from "react";
import "./Career.css";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate } from "react-router-dom";
import { CAREER_TABLE_HEAD_CELLS } from "../../constant";
import { useCareerStore } from "../../stores/useCareerStore";
import {
  deleteJob,
  getAllJob,
  getCategories,
  updateJobStatus,
} from "../../asyncActions/jobActions";
import { CircularProgress } from "@mui/material";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import useSelected from "../../hooks/useSelected";

const Career = () => {
  const navigate = useNavigate();

  const [
    page,
    limit,
    searchQuery,
    loading,
    totalItems,
    categories,
    selectedCategories,
    data,
    setCategories,
    setSelectedCategories,
    onChangeSearch,
    setJobData,
    increasePage,
    enableLoading,
    disableLoading,
  ] = useCareerStore((state) => [
    state.page,
    state.limit,
    state.searchQuery,
    state.loading,
    state.totalItems,
    state.categories,
    state.selectedCategories,
    state.data,
    state.setCategories,
    state.setSelectedCategories,
    state.onChangeSearch,
    state.setJobData,
    state.increasePage,
    state.enableLoading,
    state.disableLoading,
  ]);
  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const [selected, setSelected] = React.useState([]);

  const goToCareerDetail = (selectedCareer) => {
    const careerId = selectedCareer[0];
    navigate(`/career/detail/${careerId}`);
  };

  useEffect(() => {
    fetchDataCareer();
  }, [page, selectedCategories, searchQuery]);

  const fetchDataCareer = () => {
    getAllJobData();
    getCategoriesData();
  };

  const getAllJobData = async () => {
    try {
      enableLoading();
      const response = await getAllJob(
        searchQuery,
        page === 0 ? 1 : page + 1,
        limit,
        selectedCategories
      );
      setJobData(response.data);
      disableLoading();
    } catch (error) {
      disableLoading();
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
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
      const response = await deleteJob(payload);
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
        getAllJobData();
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
      const response = await updateJobStatus(jobId, { status: statusToUpdate });
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
        getAllJobData();
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
        headerTitle="Lowongan Pekerjaan"
        infoTitle="Total Lowongan"
        total={totalItems}
        selectTitle="Filter Berdasar Kategori"
        searchLabel="Cari Lowongan"
        onDelete={onDelete}
        onChangeSearch={onChangeSearch}
        onSelect={onChangeCategories}
        selectItems={categories}
        buttonTitle="Tambah"
        onAdd={() => navigate("/career/add")}
        headCells={CAREER_TABLE_HEAD_CELLS}
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
        onClickDetail={(selectedCareer) => goToCareerDetail(selectedCareer)}
        rows={data}
      />
    </HContainer>
  );
};

export default Career;
