import { alpha } from "@mui/system";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const { onDeleteList } = props;

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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: "#071244",
            fontFamily: `'inter',sans-serif`,
          }}
        >
          Fasilitas
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
