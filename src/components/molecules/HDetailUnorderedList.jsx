import { Typography } from "@mui/material";
import React from "react";
import HUnorderedList from "../atoms/HUnorderedList";

const HDetailUnorderedList = ({ listTitle, listData }) => {
  return (
    <>
      <Typography
        sx={{ fontWeight: "500", color: "var(--secondary-text)" }}
        component="h2"
        variant="subtitle1"
      >
        {listTitle}
      </Typography>
      {listData &&
        listData.map((v, i) => {
          return <HUnorderedList key={i} listItemData={v} />;
        })}
    </>
  );
};

export default HDetailUnorderedList;
