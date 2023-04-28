import { Box, Typography } from "@mui/material";
import React from "react";
import HSpacer from "../atoms/HSpacer";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";

const InfoBox = ({ total, title }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "500", color: "var(--text)" }}
              component="h2"
              variant="subtitle1"
            >
              {title}
            </Typography>
            <HSpacer size="small" />
            <Typography
              sx={{ fontWeight: "400", color: "var(--text)" }}
              component="h2"
              variant="h4"
            >
              {total}
            </Typography>
          </Box>
          <PollOutlinedIcon sx={styles.pollIcon} />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: 225,
    height: 100,
    bgcolor: "var(--off-white)",
    borderRadius: "8px",
    border: "1px solid var(--border)",
  },
  innerContainer: {
    margin: "10px",
  },
  pollIcon: {
    color: "var(--primary)",
    alignSelf: "center",
    width: "40px",
    height: "40px",
  },
};

export default InfoBox;
