import React from "react";
import HecContainer from "../atoms/HContainer";
import { Typography } from "@mui/material";
import HSpacer from "../atoms/HSpacer";
import { Box } from "@mui/system";
import HDetailsDecs from "../organism/HDetailsDesc";
import HDetailsPage from "../organism/HDetailsPage";
import dayjs from "dayjs";

const HCommmonDetails = ({
  detailsTitle,
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
  desc,
  descTitle,
  image,
  responsibilities,
  responsibilitiesTitle,
  requirements,
  requirementsTitle,
  isFull,
  isFullTitle,
}) => {
  return (
    <HecContainer>
      <Typography sx={{ color: "var(--text)" }} component="h2" variant="h3">
        {detailsTitle}
      </Typography>
      <HSpacer size="small" />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <HDetailsDecs
          desc={desc}
          descTitle={descTitle}
          image={image}
          responsibilities={responsibilities}
          responsibilitiesTitle={responsibilitiesTitle}
          requirements={requirements}
          requirementsTitle={requirementsTitle}
        />
        <HSpacer size="extraLarge" />
        <HDetailsPage
          createdAt={dayjs(createdAt).format("MM/DD/YYYY")}
          createdAtTitle={createdAtTitle}
          lastSubmission={dayjs(lastSubmission).format("MM/DD/YYYY")}
          lastSubmissionTitle={lastSubmissionTitle}
          category={category}
          categoryTitle={categoryTitle}
          type={type}
          typeTitle={typeTitle}
          salaryRange={salaryRange}
          isFull={isFull}
          isFullTitle={isFullTitle}
          salaryRangeTitle={salaryRangeTitle}
          location={location}
          locationTitle={locationTitle}
          status={status}
          statusTitle={statusTitle}
        />
      </Box>
    </HecContainer>
  );
};

export default HCommmonDetails;
