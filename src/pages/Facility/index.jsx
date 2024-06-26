import React, { useEffect } from "react";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate } from "react-router-dom";
import { FACILITY_TABLE_HEAD_CELLS } from "../../constant";
import { useReadStore } from "../../stores/useReadStore";

import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import {
  deleteFacility,
  getAllFacility,
  updateFacilityStatus,
} from "../../asyncActions/FacilityActions";

const Facility = () => {
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
  ]);
  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const [selected, setSelected] = React.useState([]);

  const goToFacilityDetail = (selectedFacility) => {
    const facilityId = selectedFacility[0];
    navigate(`/facility/detail/${facilityId}`);
  };

  useEffect(() => {
    fetchDataFacility();
  }, [page, searchQuery]);

  const fetchDataFacility = () => {
    getAllFacilityData();
  };

  const getAllFacilityData = async () => {
    try {
      enableLoading();
      const response = await getAllFacility(
        searchQuery,
        page === 0 ? 1 : page + 1,
        limit,
        selectedCategories
      );
      setData(response.data);
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

  const handleChangePage = (event, newPage) => {
    if (newPage < data.length) {
      increasePage(newPage);
    }
  };

  const onDelete = async (selected) => {
    try {
      setBackdrop(true);
      const payload = {
        idToDelete: selected,
      };
      const response = await deleteFacility(payload);
      if (response.data.success) {
        setBackdrop(false);
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
        setSelected([]);
        getAllFacilityData();
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
      const facilityId = selected[0];
      const statusValue = data.filter((v) => v.id === facilityId);
      const statusToUpdate =
        statusValue[0].status_name === "DRAFT" ? "PUBLISHED" : "DRAFT";
      const response = await updateFacilityStatus(facilityId, {
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
        getAllFacilityData();
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
        headerTitle="Fasilitas Pelatihan"
        infoTitle="Total Fasilitas"
        total={totalItems}
        searchLabel="Cari Fasilitas"
        onDelete={onDelete}
        onChangeSearch={onChangeSearch}
        buttonTitle="Tambah"
        onAdd={() => navigate("/facility/add")}
        headCells={FACILITY_TABLE_HEAD_CELLS}
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
        onClickDetail={(selectedFacility) =>
          goToFacilityDetail(selectedFacility)
        }
        rows={data}
      />
    </HContainer>
  );
};

export default Facility;
