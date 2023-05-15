import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Career.css";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate, useParams } from "react-router-dom";
import { CAREER_TABLE_HEAD_CELLS } from "../../constant";
import { useCareerStore } from "../../stores/useCareerStore";
import { getAllJob, getCategories } from "../../asyncActions/jobActions";
import { CircularProgress } from "@mui/material";

const Career = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [
    page,
    limit,
    searchQuery,
    filterBy,
    loading,
    totalItems,
    totalPage,
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
    state.filterBy,
    state.loading,
    state.totalItems,
    state.totalPage,
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
  console.log("ini total page", totalPage);
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
      console.log("ini error", error);
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.log("ini error", error);
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
