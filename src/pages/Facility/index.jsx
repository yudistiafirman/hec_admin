import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Dialog,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedToolbar";
import { useEffect, useState } from "react";
import { apiUrl } from "../../Default";
import AddNewDialog from "./AddNewDialog";
import axios from "axios";
import Swal from "sweetalert2";
const AdminFasilitas = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [rows, SetRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [orderBy, setOrderBy] = useState("Nama Pekerjaan");
  const [openForm, setOpenForm] = useState(false);
  const [showImage, SetShowImages] = useState(null);

  useEffect(() => {
    onGetFasilitasData("");
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onGetFasilitasData = (name) => {
    axios.get(`${apiUrl}/fasilitas/all?name=${name}`).then((response) => {
      SetRows(response.data.data);
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteList = () => {
    axios
      .delete(`${apiUrl}/fasilitas/delete?id=${selected}`)
      .then((response) => {
        if (response.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Penghapusan data fasilitas berhasil",
            text: "Penghapusan  data fasilitas telah berhasil",
          });
          setSelected([]);
          onGetFasilitasData("");
        }
      });
  };

  const onChangeFacility = (e) => {
    onGetFasilitasData(e.target.value);
  };
  return (
    <div className="admin-container">
      <Dialog
        // title={"POST"}
        scroll={"body"}
        open={showImage ? true : false}
        onClose={() => {
          SetShowImages(null);
        }}
        hideActions={true}
      >
        <Grid container direction="row" justify="center">
          <img alt="#" style={{ maxWidth: "100%" }} src={showImage}></img>
        </Grid>
      </Dialog>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "flex-end",
          backgroundColor: "#ffffff",
          alignItems: "center",
          paddingBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginRight: "20px", width: "200px" }}>
          <input
            placeholder="Cari Fasilitas"
            style={{
              marginRight: "20px",
              height: "30px",
              width: "200px",
              backgroundColor: "#F4F4F4",
              borderRadius: "4px",
              border: "1px solid #C4C4C4",
              outline: "none",
              fontSize: "15px",
            }}
            fullWidth
            onChange={onChangeFacility}
            label="Cari Lowongan"
          />
        </div>
        <Button
          onClick={() => setOpenForm(true)}
          style={{ marginRight: "10px" }}
          variant="outlined"
        >
          add new
        </Button>
      </div>
      <AddNewDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onGetFasilitasData={() => onGetFasilitasData("")}
      />
      <Box sx={{ width: "100%", height: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            onDeleteList={onDeleteList}
            numSelected={selected.length}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 1000 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "large"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {rows.length > 0 &&
                  stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
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
                            {row.name}
                          </TableCell>
                          <TableCell
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "#071244",
                            }}
                            align="left"
                          >
                            <div
                              onClick={() =>
                                SetShowImages(`${apiUrl}/${row.image_1}`)
                              }
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid #C4C4C4",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundImage: `url(${apiUrl}/${row.image_1})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "#071244",
                            }}
                          >
                            <div
                              onClick={
                                row.image_2 !== null
                                  ? () =>
                                      SetShowImages(`${apiUrl}/${row.image_2}`)
                                  : null
                              }
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid #C4C4C4",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundImage:
                                    row.image_2 !== null &&
                                    `url(${apiUrl}/${row.image_2})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "#071244",
                            }}
                            onClick={
                              row.image_3 !== null
                                ? () =>
                                    SetShowImages(`${apiUrl}/${row.image_3}`)
                                : null
                            }
                          >
                            <div
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid #C4C4C4",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundImage:
                                    row.image_3 !== null &&
                                    `url(${apiUrl}/${row.image_3})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "#071244",
                            }}
                          >
                            <div
                              style={{ width: "250px", alignContent: "center" }}
                            >
                              <p style={{ textAlign: "left" }}>
                                {row.descriptions}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default AdminFasilitas;
