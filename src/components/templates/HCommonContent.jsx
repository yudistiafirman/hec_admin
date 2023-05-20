import React from "react";
import HTableToolbar from "../organism/HToolbarHeader";
import HTable from "../organism/HTable";
import HSpacer from "../atoms/HSpacer";
import { CircularProgress } from "@mui/material";

const HCommonContent = ({
  headerTitle,
  selectTitle,
  infoTitle,
  searchLabel,
  total,
  onSelect,
  onChangeSearch,
  searchValue,
  selectItems,
  onAdd,
  buttonTitle,
  headCells,
  rows,
  onClickDetail,
  onDelete,
  rowsPerPage,
  handleChangePage,
  page,
  count,
  isLoading,
  selected,
  handleSelectAllClick,
  isSelected,
  handleClick,
  onChangeStatus,
}) => {
  return (
    <>
      <HTableToolbar
        headerTitle={headerTitle}
        selectTitle={selectTitle}
        infoTitle={infoTitle}
        searchLabel={searchLabel}
        total={total}
        onSelect={onSelect}
        onChangeSearch={onChangeSearch}
        searchValue={searchValue}
        selectItems={selectItems}
        onAdd={onAdd}
        buttonTitle={buttonTitle}
      />
      <HSpacer size="extraLarge" />
      {isLoading ? (
        <CircularProgress size={50} sx={{ margin: "auto" }} />
      ) : (
        <HTable
          selected={selected}
          onClickDetail={() => onClickDetail(selected)}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          onSelectAllClick={handleSelectAllClick}
          headCells={headCells}
          rows={rows}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          isSelected={isSelected}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default HCommonContent;
