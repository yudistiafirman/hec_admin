import React from "react";
import HTableToolbar from "../organism/HToolbarHeader";
import HTable from "../organism/HTable";
import HSpacer from "../atoms/HSpacer";

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
}) => {
  const [selected, setSelected] = React.useState([]);

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
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
      <HTable
        selected={selected}
        onClickDetail={() => onClickDetail(selected)}
        onDelete={onDelete}
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
    </>
  );
};

export default HCommonContent;
