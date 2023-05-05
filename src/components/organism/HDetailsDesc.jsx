import { Box } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import HDetailText from "../molecules/HDetailText";
import HDetailUnorderedList from "../molecules/HDetailUnorderedList";
import HImage from "../atoms/Himage";

const HDetailsDecs = ({
  desc,
  descTitle,
  image,
  responsibilities,
  responsibilitiesTitle,
  requirements,
  requirementsTitle,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--light)",
        flex: 0.7,
        padding: 2,
        borderRadius: 2,
        border: "1px solid var(--border)",
      }}
    >
      <HImage image={image} />
      <HSpacer size="large" />
      {desc && <HDetailText title={descTitle} detail={desc} />}
      <HSpacer size="large" />
      {responsibilities && (
        <HDetailUnorderedList
          listTitle={responsibilitiesTitle}
          listData={responsibilities}
        />
      )}
      <HSpacer size="large" />
      {requirements && (
        <HDetailUnorderedList
          listTitle={requirementsTitle}
          listData={requirements}
        />
      )}
    </Box>
  );
};

export default HDetailsDecs;
