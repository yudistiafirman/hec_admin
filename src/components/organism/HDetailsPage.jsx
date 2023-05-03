import { Box } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import HDetailText from "../molecules/HDetailText";
import HDetailLocationText from "../molecules/HDetailLocationText";
import HDetailStatus from "../molecules/HDetailStatus";

const HDetailsPage = ({
  createdAt,
  createdAtTitle,
  lastSubmission,
  lastSubmissionTitle,
  category,
  categoryTitle,
  type,
  typeTitle,
  salaryRange,
  salaryRangeTitle,
  location,
  locationTitle,
  status,
  statusTitle,
}) => {
  return (
    <Box
      sx={{
        flex: 0.3,
        backgroundColor: "var(--light)",
        padding: 2,
        borderRadius: 2,
        border: "1px solid var(--border)",
      }}
    >
      <HSpacer size="large" />
      {status && <HDetailStatus title={statusTitle} detail={status} />}
      <HSpacer size="large" />
      {createdAt && <HDetailText title={createdAtTitle} detail={createdAt} />}
      <HSpacer size="large" />
      {lastSubmission && (
        <HDetailText title={lastSubmissionTitle} detail={lastSubmission} />
      )}
      <HSpacer size="large" />
      {category && <HDetailText title={categoryTitle} detail={category} />}
      <HSpacer size="large" />
      {location && (
        <HDetailLocationText title={locationTitle} detail={location} />
      )}
      <HSpacer size="large" />
      {type && <HDetailText title={typeTitle} detail={type} />}
      <HSpacer size="large" />
      {salaryRange && (
        <HDetailText title={salaryRangeTitle} detail={salaryRange} />
      )}
    </Box>
  );
};

export default HDetailsPage;
