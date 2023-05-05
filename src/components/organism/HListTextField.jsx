import { Box } from "@mui/system";
import React from "react";
import HTextField from "../atoms/HTextField";
import HButton from "../atoms/HButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HSpacer from "../atoms/HSpacer";

const HListTextField = ({
  firstSectionList,
  secondSectionList,
  onChangeFirst,
  onChangeSecond,
  onAddFirstSection,
  onRemoveFirstSection,
  onAddSecondSection,
  onRemoveSecondSection,
}) => {
  return (
    <>
      <Box sx={{ flex: 0.4 }}>
        {firstSectionList && (
          <Box sx={{ flex: 0 }}>
            {firstSectionList.map((v, i) => {
              return (
                <>
                  <HTextField
                    label={v.label}
                    sx={{ width: "100%" }}
                    value={v.value}
                    required
                    onChange={(e) => onChangeFirst(e, i)}
                  />
                  <HSpacer size="large" />
                </>
              );
            })}
            <HSpacer size="large" />
            <Box sx={{ display: "flex" }}>
              <HButton
                variant="outlined"
                title="Tambah"
                disabled={firstSectionList.length === 8}
                onClick={onAddFirstSection}
                startIcon={<AddIcon />}
              />
              <HSpacer size="large" />
              <HButton
                variant="outlined"
                title="Kurangi"
                disabled={firstSectionList.length === 1}
                onClick={onRemoveFirstSection}
                startIcon={<RemoveIcon />}
              />
            </Box>
          </Box>
        )}
        <HSpacer size="extraLarge" />
        {secondSectionList && (
          <Box sx={{ flex: 0.4 }}>
            {secondSectionList.map((v, i) => {
              return (
                <>
                  <HTextField
                    sx={{ width: "100%" }}
                    label={v.label}
                    required
                    value={v.value}
                    onChange={(e) => onChangeSecond(e, i)}
                  />
                  <HSpacer size="large" />
                </>
              );
            })}
            <HSpacer size="large" />
            <Box sx={{ display: "flex" }}>
              <HButton
                variant="outlined"
                title="Tambah"
                disabled={secondSectionList.length === 8}
                onClick={onAddSecondSection}
                startIcon={<AddIcon />}
              />
              <HSpacer size="large" />
              <HButton
                variant="outlined"
                title="Kurangi"
                disabled={secondSectionList.length === 1}
                onClick={onRemoveSecondSection}
                startIcon={<RemoveIcon />}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default HListTextField;
