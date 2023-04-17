import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
const CollpsibleTable = ({
  row,
  handleClick,
  index,
  isItemSelected,
  labelId,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow hover tabIndex={-1} key={index}>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          style={{ color: "blue", cursor: "pointer" }}
        >
          <Checkbox
            onClick={(event) => handleClick(event, row.id)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          style={{
            fontSize: "15px",
            fontWeight: "800",
            color: "#071244",
          }}
        >
          {row.title}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            fontSize: "15px",
            fontWeight: "500",
            color: "#071244",
          }}
          align="left"
        >
          {row.descriptions}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#071244",
                  fontFamily: `'inter',sans-serif`,
                }}
              >
                Scope Services
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: "#6B7280",
                        fontFamily: `'inter',sans-serif`,
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: "#6B7280",
                        fontFamily: `'inter',sans-serif`,
                      }}
                    >
                      Deskripsi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.scope.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell
                        style={{
                          fontSize: "15px",
                          fontWeight: "800",
                          color: "#071244",
                        }}
                        component="th"
                        scope="row"
                      >
                        {historyRow.scope_title}
                      </TableCell>
                      <TableCell>{historyRow.scope_descriptions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollpsibleTable;
