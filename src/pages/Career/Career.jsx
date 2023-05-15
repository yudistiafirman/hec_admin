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
} from "../../asyncActions/jobActions";
import { CircularProgress } from "@mui/material";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";

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
  const goToCareerDetail = (selectedCareer) => {
    const careerId = selectedCareer[0];
    navigate(`/career/detail/${careerId}`);
  };

  useEffect(() => {
    fetchDataCareer();
  }, [page, selectedCategories]);

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
      setCategories(response.data.data);
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

  if (loading) {
    return <CircularProgress size={50} sx={{ margin: "auto" }} />;
  }

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
        onClickDetail={(selectedCareer) => goToCareerDetail(selectedCareer)}
        rows={data}
      />
    </HContainer>
  );
};

export default Career;
