import { Box } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import HDetailText from "../molecules/HDetailText";
import HDetailLocationText from "../molecules/HDetailLocationText";
import HDetailStatus from "../molecules/HDetailStatus";
import HDetailAvail from "../molecules/HDetailAvail";
import dayjs from "dayjs";

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
  isFull,
  isFullTitle,
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
      {isFull === 0 && (
        <HDetailAvail title={isFullTitle} color="info" detail="Lowong" />
      )}
      {isFull === 1 && (
        <HDetailAvail title={isFullTitle} color="error" detail="Penuh" />
      )}
      <HSpacer size="large" />
      {createdAt && (
        <HDetailText
          title={createdAtTitle}
          detail={dayjs(createdAt).format("MM/DD/YYYY")}
        />
      )}
      <HSpacer size="large" />
      {lastSubmission && (
        <HDetailText
          title={lastSubmissionTitle}
          detail={dayjs(lastSubmission).format("MM/DD/YYYY")}
        />
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
