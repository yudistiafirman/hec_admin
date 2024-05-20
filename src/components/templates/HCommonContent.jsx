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
	isFull,
	onChangeIsFull,
	dateFilterLabel,
	dateFilterValue,
	onChangeFilterDate,
	isPopular,
	onChangeIsPopular,
	hideStatus,
	hideSearch,
	hideDetailButton,
	hidePagination,
	showEditButton,
	onClickEdit,
}) => {
	return (
		<>
			<HTableToolbar
				hideSearch={hideSearch}
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
				dateFilterLabel={dateFilterLabel}
				dateFilterValue={dateFilterValue}
				onChangeFilterDate={onChangeFilterDate}
			/>
			<HSpacer size="extraLarge" />
			{isLoading ? (
				<CircularProgress size={50} sx={{ margin: "auto" }} />
			) : (
				<HTable
					selected={selected}
					onClickDetail={() => onClickDetail(selected)}
					onDelete={onDelete}
					onChangeIsFull={onChangeIsFull}
					onChangeStatus={onChangeStatus}
					onSelectAllClick={handleSelectAllClick}
					headCells={headCells}
					isFull={isFull}
					isPopular={isPopular}
					onChangeIsPopular={onChangeIsPopular}
					rows={rows}
					count={count}
					rowsPerPage={rowsPerPage}
					page={page}
					handleChangePage={handleChangePage}
					isSelected={isSelected}
					handleClick={handleClick}
					hideStatus={hideStatus}
					hideDetailButton={hideDetailButton}
					hidePagination={hidePagination}
					showEditButton={showEditButton}
					onClickEdit={onClickEdit}
				/>
			)}
		</>
	);
};

export default HCommonContent;
