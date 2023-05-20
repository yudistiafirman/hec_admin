import { Box } from "@mui/material";
import React from "react";
import HListTextField from "../organism/HListTextField";
import HAddDetail from "../organism/HAddDetail";

const HCommonAddDetail = ({
  firstSectionList,
  secondSectionList,
  onChangeFirst,
  onChangeSecond,
  onAddFirstSection,
  onRemoveFirstSection,
  onAddSecondSection,
  onRemoveSecondSection,
  typeValue,
  typeTitle,
  onChangeType,
  typeItems,
  salaryValue,
  onChangeSalary,
  salaryLabel,
  salaryItems,
  categoryLabel,
  categoryValue,
  categoryItems,
  onChangeCategory,
  statusValue,
  statusLabel,
  statusItems,
  onChangeStatus,
  locationValue,
  locationLabel,
  onChangeLocation,
  onChangeDate,
  dateValue,
  dateLabel,
  categoryTextValue,
  categoryTextLabel,
  onChangeCategoryText,
  name,
  nameLabel,
  onChangeName,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <HListTextField
        firstSectionList={firstSectionList}
        secondSectionList={secondSectionList}
        onChangeFirst={onChangeFirst}
        onChangeSecond={onChangeSecond}
        onAddFirstSection={onAddFirstSection}
        onRemoveFirstSection={onRemoveFirstSection}
        onAddSecondSection={onAddSecondSection}
        onRemoveSecondSection={onRemoveSecondSection}
      />
      <HAddDetail
        typeValue={typeValue}
        typeTitle={typeTitle}
        onChangeType={onChangeType}
        typeItems={typeItems}
        salaryValue={salaryValue}
        onChangeSalary={onChangeSalary}
        salaryLabel={salaryLabel}
        salaryItems={salaryItems}
        categoryLabel={categoryLabel}
        categoryValue={categoryValue}
        categoryItems={categoryItems}
        onChangeCategory={onChangeCategory}
        statusValue={statusValue}
        statusLabel={statusLabel}
        statusItems={statusItems}
        onChangeStatus={onChangeStatus}
        locationValue={locationValue}
        locationLabel={locationLabel}
        onChangeLocation={onChangeLocation}
        onChangeDate={onChangeDate}
        dateValue={dateValue}
        dateLabel={dateLabel}
        name={name}
        nameLabel={nameLabel}
        onChangeName={onChangeName}
        categoryTextValue={categoryTextValue}
        categoryTextLabel={categoryTextLabel}
        onChangeCategoryText={onChangeCategoryText}
      />
    </Box>
  );
};

export default HCommonAddDetail;
