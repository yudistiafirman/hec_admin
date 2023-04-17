import React, { useCallback, useEffect, useRef, useState } from "react";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import moment from "moment";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { AiFillPicture } from "react-icons/ai";
import axios from "axios";
import { apiUrl } from "../../Default";
const AdminGaleri = () => {
  const [order, setOrder] = useState("asc");
  const [rows, SetRows] = useState([]);
  const [openForm, SetOpenForm] = useState(false);
  const [orderBy, setOrderBy] = useState("Nama Pekerjaan");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [galeriTitle, SetgaleriTitle] = useState("");
  const [searchGaleri, SetOnSearchGaleri] = useState("");
  const [careerId, SetCareerId] = useState("");
  const [openDetail, SetOpenDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showImage, SetShowImages] = useState(null);

  const onOpenDetail = (id) => {
    SetOpenDetail(true);
    SetCareerId(id);
  };

  const onChangegaleriTitle = (e) => {
    if (e.target.value.length <= 45) {
      SetgaleriTitle(e.target.value);
    }
  };

  const onSearchGaleri = useCallback(
    (e) => {
      SetOnSearchGaleri(e.target.value);
      getGaleriData(e.target.value);
    },
    [searchGaleri]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onAddGaleri = () => {
    //semua form harus terisi kecuali tanggal dan kualifikasi hanya satu saja yang terisi
    if (!galeriTitle) {
      alert("judul galeri tidak boleh kosong");
    } else if (!selectedFile) {
      alert("photo galeri tidak boleh kosong");
    } else {
      let data = new FormData();
      data.append("title", galeriTitle);
      data.append("image_1", selectedFile);
      axios.post(`${apiUrl}/galeri/upload`, data).then((response) => {
        if (response.data.error) {
          SetOpenForm(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        } else {
          SetOpenForm(false);
          Swal.fire({
            icon: "success",
            title: "Penambahan Galeri Sukses",
            text: "Penambahan Galeri terbaru berhasil",
          });
          SetgaleriTitle("");
          setSelectedFile();
          getGaleriData("");
        }
      });
    }
  };

  const getGaleriData = (title) => {
    axios.get(`${apiUrl}/galeri/all?title=${title}`).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      } else {
        SetRows(response.data.data);
      }
    });
  };

  useEffect(() => {
    getGaleriData("");
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

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

  const onDeleteList = () => {
    axios.delete(`${apiUrl}/galeri/delete?id=${selected}`).then((response) => {
      if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Penghapusan data galeri berhasil",
          text: "Penghapusan  data galeri telah berhasil",
        });
        setSelected([]);
        getGaleriData("");
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handlePopularClick = (event, name, value) => {
    let valueToSend;
    if (value === 0) {
      valueToSend = 1;
    } else {
      valueToSend = 0;
    }
    axios
      .patch(`${apiUrl}/galeri/update?id=${name}&value=${valueToSend}`)
      .then((response) => {
        getGaleriData("");
      })
      .catch((err) => {
        console.log(err);
      });
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

  const headCells = [
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Judul Galeri",
    },
    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "created_at",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Dibuat",
    },
    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Set As Home Galeri",
    },
  ];
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#6B7280",
                fontFamily: `'inter',sans-serif`,
              }}
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

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
            Galeri
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
  return (
    <div className="admin-container">
      <div className="add-new-career-btn">
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
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "flex-end",
          backgroundColor: "#ffffff",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginRight: "20px", width: "200px" }}>
          <input
            placeholder="Cari Judul Galeri"
            value={searchGaleri}
            onChange={onSearchGaleri}
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
          />
        </div>
        <Button
          style={{ marginRight: "10px" }}
          onClick={() => SetOpenForm(true)}
          variant="outlined"
        >
          add new
        </Button>
      </div>

      <Dialog open={openForm} onClose={() => SetOpenForm(false)}>
        <DialogTitle>Tambahkan Galeri</DialogTitle>
        <DialogContent>
          <div
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "300px", padding: "10px" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Judul Galeri"
                value={galeriTitle}
                helperText={`${galeriTitle.length}/45`}
                onChange={onChangegaleriTitle}
                variant="outlined"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "8px",
                border: "1px solid #ECECEC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {selectedFile ? (
                <div
                  onClick={() => SetShowImages(preview)}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${preview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AiFillPicture style={{ color: "#C4C4C4" }} size="large" />
              )}
            </div>
            <input type="file" onChange={onSelectFile} accept="image/*" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => SetOpenForm(false)}>Cancel</Button>
          <Button onClick={onAddGaleri}>Tambahkan</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: "100%", height: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell padding="checkbox">
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
                          onClick={() => onOpenDetail(row.id)}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#071244",
                          }}
                          align="center"
                        >
                          <div
                            onClick={() =>
                              SetShowImages(`${apiUrl}/${row.image}`)
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
                                backgroundImage: `url(${apiUrl}/${row.image})`,
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
                          {moment(row.created_at).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#071244",
                          }}
                        >
                          <Checkbox
                            onClick={(event) =>
                              handlePopularClick(event, row.id, row.is_home)
                            }
                            color="primary"
                            checked={row.is_home !== 0}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
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

export default AdminGaleri;
