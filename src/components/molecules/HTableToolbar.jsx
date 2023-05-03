import { Box, Chip, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import HSpacer from "../atoms/HSpacer";

const HTableToolbar = ({ numSelected, onClickDetail, onDelete }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} terpilih
        </Typography>
      )}

      {numSelected > 0 && (
        <Box sx={{ display: "flex" }}>
          {numSelected === 1 && (
            <Tooltip title="Lihat Detail">
              <Chip
                icon={<FindInPageIcon />}
                label="Lihat Detail"
                color="info"
                onClick={onClickDetail}
              />
            </Tooltip>
          )}

          <HSpacer size="small" />
          <Tooltip title="Hapus">
            <Chip
              onClick={onDelete}
              icon={<DeleteIcon />}
              label="Hapus"
              color="error"
            />
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};

export default HTableToolbar;
