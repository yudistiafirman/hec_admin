import {
  Checkbox,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HTableToolbar from "../molecules/HTableToolbar";
import HTableHead from "../molecules/HTableHead";

const HTable = ({
  selected,
  onSelectAllClick,
  headCells,
  rows,
  isSelected,
  handleClick,
  onClickDetail,
  onDelete,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Box sx={{ minWidth: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <HTableToolbar
          onClickDetail={onClickDetail}
          onDelete={onDelete}
          numSelected={selected && selected.length}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <HTableHead
              onSelectAllClick={onSelectAllClick}
              headCells={headCells && headCells}
              rowCount={rows && rows.length}
              numSelected={selected && selected.length}
            />
            <TableBody>
              {rows &&
                rows.map((row, i) => {
                  const isItemSelected = isSelected && isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${row.id}`;
                  return (
                    <TableRow
                      onClick={(event) =>
                        handleClick && handleClick(event, row.id)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={i}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      hover
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {row.name && <TableCell>{row.name}</TableCell>}

                      {row.last_submission && (
                        <TableCell>{row.last_submission}</TableCell>
                      )}
                      {row.category && <TableCell>{row.category}</TableCell>}
                      {row.status && (
                        <TableCell>
                          <Chip
                            color={
                              row.status === "DRAFT" ? "primary" : "success"
                            }
                            label={row.status}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          labelRowsPerPage="Baris Setiap Halaman"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default HTable;
