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
import dayjs from "dayjs";

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
  count,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Box sx={{ minWidth: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <HTableToolbar
          onClickDetail={onClickDetail}
          onDelete={() => onDelete(selected)}
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
                        <TableCell>
                          {dayjs(row.last_submission).format("MM/DD/YYYY")}
                        </TableCell>
                      )}
                      {row.category_name && (
                        <TableCell>{row.category_name}</TableCell>
                      )}
                      {row.type_name && (
                        <TableCell>
                          {" "}
                          <Chip
                            color={
                              row.type_name === "FULL_TIME"
                                ? "info"
                                : row.type_name === "PART_TIME"
                                ? "secondary"
                                : "error"
                            }
                            label={row.type_name}
                          />
                        </TableCell>
                      )}
                      {row.status_name && (
                        <TableCell>
                          <Chip
                            color={
                              row.status_name === "DRAFT"
                                ? "primary"
                                : "success"
                            }
                            label={row.status_name}
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
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
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
