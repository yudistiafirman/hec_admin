import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";

const HTableHead = ({ onSelectAllClick, numSelected, rowCount, headCells }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "var(--primary)",
      color: "var(--off-white)",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells &&
          headCells.map((headCell) => (
            <StyledTableCell key={headCell.id}>
              {headCell.label}
            </StyledTableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default HTableHead;
