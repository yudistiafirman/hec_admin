import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const HTableHead = ({ onSelectAllClick, numSelected, rowCount, headCells }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount && rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick && onSelectAllClick}
          />
        </TableCell>
        {headCells &&
          headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default HTableHead;
