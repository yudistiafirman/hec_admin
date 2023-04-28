import React from "react";
import HCommonHeader from "../organism/HCommonHeader";

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
}) => {
  return (
    <>
      <HCommonHeader
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
    </>
  );
};

export default HCommonContent;
