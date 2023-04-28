import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Career.css";
import CssBaseline from "@mui/material/CssBaseline";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
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
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  AiFillPicture,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import axios from "axios";
import { apiUrl } from "../../Default";
import { stringSlicer } from "../../utils/funcHelper";
import CareerDetail from "./CareerDetail";
import HContainer from "../../components/atoms/HContainer";
import InfoBox from "../../components/molecules/InfoBox";
import HSpacer from "../../components/atoms/HSpacer";
import HSelect from "../../components/atoms/HSelect";
import { SearchOffRounded } from "@mui/icons-material";
import HTextField from "../../components/atoms/HTextField";
import HButton from "../../components/atoms/HButton";
import HCommonContent from "../../components/templates/HCommonContent";

const Career = () => {
  const [order, setOrder] = useState("asc");
  const [rows, SetRows] = useState([]);

  const [categories, SetCategories] = useState([]);
  const [openForm, SetOpenForm] = useState(false);
  const [orderBy, setOrderBy] = useState("Nama Pekerjaan");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCategory, SetOpenCategory] = useState(false);
  const [kualifikasiForm, SetKualifikasiForm] = useState([
    {
      label: "Kualifikasi",
      kualifikasiValue: "",
    },
  ]);
  const [indexKualifikasi, SetindexKualifikasi] = useState(0);
  const kualifikasiRef = useRef(null);
  const [jobName, SetJobName] = useState("");
  const [jobDescription, SetJobDescription] = useState("");
  const [optionValue, SetOptionValue] = useState(null);
  const [inputOption, SetInputOption] = useState(null);
  const [startDate, SetStartDate] = useState(new Date());
  const [categoryName, SetCategoryName] = useState("");
  const [searchVacancy, SetOnSearchVacancy] = useState("");
  const [filterDate, SetFilterDate] = useState(new Date());
  const [filterCategory, SetFilterCategory] = useState(null);
  const [careerId, SetCareerId] = useState("");
  const [openDetail, SetOpenDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showImage, SetShowImages] = useState(null);

  const onOpenDetail = (id) => {
    SetOpenDetail(true);
    SetCareerId(id);
  };

  const onChangeCategoryName = (e) => {
    if (e.target.value.length <= 45) {
      SetCategoryName(e.target.value);
    }
  };
  const onChangeJobDescription = (e) => {
    if (e.target.value.length <= 500) {
      SetJobDescription(e.target.value);
    }
  };

  const onChangeJobName = (e) => {
    if (e.target.value.length <= 45) {
      SetJobName(e.target.value);
    }
  };

  useEffect(() => {
    getAllvacancies("", "", "");
    getVacanciesCategories();
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
  const getAllvacancies = (queryValue, date, category) => {
    axios
      .get(
        `${apiUrl}/vacancies/all?&name=${queryValue}&date=${date}&category=${category}`
      )
      .then((response) => {
        SetRows(response.data.data);
      });
  };

  const getVacanciesCategories = () => {
    axios.get(apiUrl + "/vacancies/category").then((response) => {
      SetCategories(response.data.data);
    });
  };

  const onDeleteKualifikasiForm = (i) => {
    SetindexKualifikasi((prev) => prev - 1);
    const newFormKualifikasi = kualifikasiForm.filter((v, idx) => idx !== i);
    SetKualifikasiForm(newFormKualifikasi);
  };

  const onAddKualifikasi = () => {
    let prevIdx = kualifikasiForm.length - 1;
    if (kualifikasiForm[prevIdx].kualifikasiValue) {
      if (kualifikasiForm.length < 8) {
        SetKualifikasiForm([
          ...kualifikasiForm,
          { label: `Kualifikasi`, kualifikasiValue: "" },
        ]);
      } else {
        alert("Penambahan kualifkasi telah mencapai batas maksimal");
      }
    } else {
      alert(
        `Nilai kualifikasi ke ${kualifikasiForm.length} tidak boleh kosong`
      );
    }
  };

  const onSearchVacancy = useCallback(
    (e) => {
      SetOnSearchVacancy(e.target.value);
      getAllvacancies(
        searchVacancy,
        moment(filterDate).format("YYYY-MM-DD"),
        filterCategory !== null ? filterCategory.category_name : ""
      );
    },
    [searchVacancy, filterDate, filterCategory]
  );

  const onFilterDate = useCallback(
    (valueDate) => {
      SetFilterDate(valueDate);
      getAllvacancies(
        searchVacancy,
        moment(valueDate).format("YYYY-MM-DD"),
        filterCategory !== null ? filterCategory.category_name : ""
      );
    },
    [filterDate, searchVacancy, filterCategory]
  );

  const onFilterCategory = useCallback(
    (value) => {
      SetFilterCategory(value);
      getAllvacancies(searchVacancy, "", value.category_name);
    },
    [filterCategory, searchVacancy, filterDate]
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

  const onAddCareer = () => {
    //semua form harus terisi kecuali tanggal dan kualifikasi hanya satu saja yang terisi

    if (!jobName) {
      alert("nama pekerjaan harus diisi");
    } else if (!selectedFile) {
      alert("image pelatihan harus diisi");
    } else if (!jobDescription) {
      alert("deskripsi pekerjaan harus diisi");
    } else if (!optionValue && !categoryName) {
      alert("categori pekarjaan harus diisi");
    } else if (!kualifikasiForm[0].kualifikasiValue) {
      alert("paling sedikit 1 kualifikasi harus diisi");
    } else {
      const newArrKualifikasi = [...kualifikasiForm];
      const job_qualifications = newArrKualifikasi
        .filter((value, idx) => value.kualifikasiValue !== "")
        .map((v, i) => {
          return { qualifications: v.kualifikasiValue };
        });

      const data = new FormData();

      data.append("job_name", jobName);
      data.append("job_description", jobDescription);
      data.append("last_submission", moment(startDate).format("YYYY-MM-DD"));
      data.append(
        "category_name",
        optionValue ? optionValue.category_name : categoryName
      );
      data.append("image_1", selectedFile);
      data.append("job_qualifications", JSON.stringify(job_qualifications));

      axios
        .post(apiUrl + "/vacancies/post", data)
        .then((response) => {
          if (response.data.error) {
            SetOpenForm(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            SetJobName("");
            SetJobDescription("");
            SetCategoryName("");
            SetOptionValue(null);
            SetInputOption(null);
            SetStartDate(new Date());
            SetKualifikasiForm([
              { kualifikasiValue: "", label: "Kualifikasi" },
            ]);
          } else {
            SetOpenForm(false);
            Swal.fire({
              icon: "success",
              title: "Penambahan lowongan kerja sukses",
              text: "Penambahan lowongan kerja terbaru berhasil",
            });
            SetJobName("");
            SetJobDescription("");
            SetCategoryName("");
            SetOptionValue(null);
            SetInputOption(null);
            SetStartDate(new Date());
            SetKualifikasiForm([
              { kualifikasiValue: "", label: "Kualifikasi" },
            ]);
            getAllvacancies("", "", "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChangeKualifikasiForm = (e, i) => {
    if (e.target.value.length <= 255) {
      let newArr = [...kualifikasiForm];
      newArr[i].kualifikasiValue = e.target.value;
      SetKualifikasiForm(newArr);
    }
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
    axios
      .delete(apiUrl + "/vacancies/delete?vacancy_id=" + selected)
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
            title: "Penghapusan lowongan kerja sukses",
            text: "Penghapusan lowongan kerja berhasil",
          });
          setSelected([]);
          getAllvacancies("", "", "");
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
      id: "job_name",
      numeric: false,
      disablePadding: true,
      label: "Pekerjaan",
    },

    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Gambar",
    },
    {
      id: "job_description",
      numeric: false,
      disablePadding: false,
      label: "Deskripsi",
    },
    {
      id: "last_submission",
      numeric: false,
      disablePadding: false,
      label: "",
    },
    {
      id: "category_name",
      numeric: false,
      disablePadding: false,
      label: "Kategori",
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
          {headCells.map((headCell) => (
            <TableCell
              style={{
                fontSize: "14px",
                fontWeight: "800",
                color: "#6B7280",
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
        {numSelected > 0 && (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} Terplilih
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
    <HContainer>
      <HCommonContent
        headerTitle="Lowongan Pekerjaan"
        infoTitle="Total Lowongan"
        total="11"
        selectTitle="Filter Berdasar Kategori"
        searchLabel="Cari Lowongan"
        buttonTitle="Tambah"
      />
    </HContainer>

    // // <div className="admin-container">
    //   {/* <Autocomplete
    //     disablePortal
    //     id="combo-box-demo"
    //     sx={{ width: 300 }}
    //     options={categories}
    //     value={filterCategory}
    //     size="small"
    //     onChange={(event, newValue) => {
    //       onFilterCategory(newValue);
    //     }}
    //     getOptionLabel={(option) => option.category_name}
    //     renderInput={(params) => (
    //       <TextField {...params} label="Filter Category" />
    //     )}
    //   /> */}
    //   {/* <div className="add-new-career-btn">
    //     {openDetail && (
    //       <CareerDetail
    //         openDetail={openDetail}
    //         careerId={careerId}
    //         closeDetail={() => SetOpenDetail(false)}
    //       />
    //     )}
    //   </div> */}
    //   {/* <Dialog
    //     // title={"POST"}
    //     scroll={"body"}
    //     open={showImage ? true : false}
    //     onClose={() => {
    //       SetShowImages(null);
    //     }}
    //     hideActions={true}
    //   >
    //     <Grid container direction="row" justify="center">
    //       <img alt="#" style={{ maxWidth: "100%" }} src={showImage}></img>
    //     </Grid>
    //   </Dialog> */}
    //   {/* <div
    //     style={{
    //       display: "flex",
    //       marginBottom: "20px",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       paddingTop: "20px",
    //       paddingBottom: "20px",
    //       borderRadius: "8px",
    //     }}
    //   > */}
    //   {/* <div style={{ marginLeft: "10px" }}>
    //       <LocalizationProvider dateAdapter={AdapterDateFns}>
    //         <DesktopDatePicker
    //           label="last submission"
    //           minDate={new Date("2017-01-01")}
    //           onChange={(newValue) => {
    //             onFilterDate(newValue);
    //           }}
    //           value={filterDate}
    //           renderInput={(params) => <TextField fullWidth {...params} />}
    //         />
    //       </LocalizationProvider>
    //     </div> */}
    //   {/* <div style={{ marginRight: "20px", width: "200px" }}>
    //       <input
    //         placeholder="Cari Lowongan"
    //         value={searchVacancy}
    //         onChange={onSearchVacancy}
    //         style={{
    //           marginRight: "20px",
    //           height: "30px",
    //           width: "200px",
    //           backgroundColor: "#F4F4F4",
    //           borderRadius: "4px",
    //           border: "1px solid #C4C4C4",
    //           outline: "none",
    //           fontSize: "15px",
    //         }}
    //         fullWidth
    //         label="Cari Lowongan"
    //       />
    //     </div>
    //     <Button
    //       style={{ marginRight: "10px" }}
    //       onClick={() => SetOpenForm(true)}
    //       variant="outlined"
    //     >
    //       add new
    //     </Button> */}
    //   {/* </div> */}
    //   {/*
    //   <Dialog open={openForm} onClose={() => SetOpenForm(false)}>
    //     <DialogTitle>Tambahkan Pekerjaan</DialogTitle>
    //     <DialogContent>
    //       <Box
    //         component="form"
    //         sx={{
    //           "& .MuiTextField-root": { m: 1 },
    //         }}
    //         noValidate
    //         autoComplete="off"
    //       >
    //         <div style={{ width: "300px" }}>
    //           <TextField
    //             id="outlined-basic"
    //             fullWidth
    //             label="Nama Pekerjaan"
    //             value={jobName}
    //             helperText={`${jobName.length}/45`}
    //             onChange={onChangeJobName}
    //             variant="outlined"
    //           />
    //         </div>
    //         <div style={{ width: "50ch" }}>
    //           <TextField
    //             id="filled-multiline-flexible"
    //             label="Deskripsi Pekerjaan"
    //             multiline
    //             fullWidth
    //             helperText={`${jobDescription.length}/500`}
    //             value={jobDescription}
    //             onChange={onChangeJobDescription}
    //             maxRows={5}
    //             variant="outlined"
    //           />
    //         </div>
    //         <div style={{ width: "300px", marginLeft: "10px" }}>
    //           <DialogContentText>*Image Career</DialogContentText>
    //           <div
    //             style={{
    //               width: "100%",
    //               height: "300px",
    //               borderRadius: "8px",
    //               border: "1px solid #ECECEC",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               overflow: "hidden",
    //               marginBottom: "10px",
    //             }}
    //           >
    //             {selectedFile ? (
    //               <div
    //                 onClick={() => SetShowImages(preview)}
    //                 style={{
    //                   width: "100%",
    //                   height: "100%",
    //                   backgroundImage: `url(${preview})`,
    //                   backgroundRepeat: "no-repeat",
    //                   backgroundSize: "contain",
    //                   backgroundPosition: "center",
    //                   cursor: "pointer",
    //                 }}
    //               />
    //             ) : (
    //               <AiFillPicture style={{ color: "#C4C4C4" }} size="large" />
    //             )}
    //           </div>
    //           <input type="file" onChange={onSelectFile} accept="image/*" />
    //         </div>
    //         <div>
    //           <Autocomplete
    //             disablePortal
    //             id="combo-box-demo"
    //             sx={{ width: 300 }}
    //             options={categories}
    //             value={optionValue}
    //             onChange={(event, newValue) => {
    //               SetOptionValue(newValue);
    //             }}
    //             getOptionLabel={(option) => option.category_name}
    //             renderInput={(params) => (
    //               <TextField {...params} label="Kategori Pekerjaan" />
    //             )}
    //           />
    //           <div
    //             style={{
    //               marginLeft: "7px",
    //               display: "flex",
    //               alignItems: "center",
    //             }}
    //           >
    //             {openCategory ? (
    //               <AiOutlineMinusSquare
    //                 onClick={() => SetOpenCategory(false)}
    //                 color="#29b6f6"
    //                 style={{ width: "25px", height: "25px", cursor: "pointer" }}
    //               />
    //             ) : (
    //               <AiOutlinePlusSquare
    //                 onClick={() => SetOpenCategory(true)}
    //                 color="#29b6f6"
    //                 style={{ width: "25px", height: "25px", cursor: "pointer" }}
    //               />
    //             )}

    //             <DialogContentText>
    //               tambahkan kategori pekerjaan
    //             </DialogContentText>
    //           </div>
    //           {openCategory && (
    //             <TextField
    //               sx={{ width: 300 }}
    //               helperText={`${categoryName.length}/45`}
    //               onChange={onChangeCategoryName}
    //               value={categoryName}
    //               fullWidth
    //               label="Kategori Pekerjaan"
    //             />
    //           )}
    //         </div>
    //       </Box>
    //       <div style={{ width: "300px", marginLeft: "7px" }}>
    //         <LocalizationProvider dateAdapter={AdapterDateFns}>
    //           <DesktopDatePicker
    //             label="last submission"
    //             minDate={new Date("2017-01-01")}
    //             onChange={(newValue) => {
    //               SetStartDate(newValue);
    //             }}
    //             value={startDate}
    //             renderInput={(params) => (
    //               <TextField
    //                 style={{ marginTop: "20px" }}
    //                 fullWidth
    //                 {...params}
    //               />
    //             )}
    //           />
    //         </LocalizationProvider>
    //       </div>
    //       <div style={{ marginLeft: "5px", marginTop: "20px" }}>
    //         <DialogContentText>*Kualifikasi Pekerjaan</DialogContentText>
    //         {kualifikasiForm.length > 0 &&
    //           kualifikasiForm.map((v, i) => {
    //             return (
    //               <div style={{ width: "50ch", marginTop: "20px" }}>
    //                 <TextField
    //                   id="filled-multiline-flexible"
    //                   label={v.label}
    //                   multiline
    //                   fullWidth
    //                   maxRows={4}
    //                   variant="outlined"
    //                   value={kualifikasiForm[i].kualifikasiValue}
    //                   onChange={(e) => onChangeKualifikasiForm(e, i)}
    //                   helperText={`${kualifikasiForm[i].kualifikasiValue.length}/255`}
    //                   ref={kualifikasiRef}
    //                 />
    //                 <div
    //                   style={{
    //                     marginTop: "10px",
    //                     display: "flex",
    //                     width: "100%",
    //                   }}
    //                 >
    //                   {i > 0 && (
    //                     <AiOutlineMinusSquare
    //                       onClick={() => onDeleteKualifikasiForm(i)}
    //                       color="#ffa726"
    //                       style={{
    //                         width: "25px",
    //                         height: "25px",
    //                         cursor: "pointer",
    //                       }}
    //                     />
    //                   )}
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         <div>
    //           <AiOutlinePlusSquare
    //             onClick={() => onAddKualifikasi()}
    //             color="#29b6f6"
    //             style={{ width: "25px", height: "25px", cursor: "pointer" }}
    //           />
    //         </div>
    //       </div>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={() => SetOpenForm(false)}>Cancel</Button>
    //       <Button onClick={onAddCareer}>Tambahkan</Button>
    //     </DialogActions>
    //   </Dialog> */}

    //   <Box sx={{ width: "100%", height: "100%" }}></Box>
    // // </div>
  );
};

export default Career;
