import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Career.css";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate, useParams } from "react-router-dom";

const Career = () => {
  const navigate = useNavigate();
  const params = useParams();

  const goToCareerDetail = (selectedCareer) => {
    const careerId = selectedCareer[0];
    navigate(`/career/detail/${careerId}`);
  };

  const headCells = [
    {
      id: "job_name",
      label: "Nama Pekerjaan",
    },
    {
      id: "last_submission",
      label: "Tanggal Penyerahan Terakhir",
    },
    {
      id: "category_name",
      label: "Kategori Pekerjaan",
    },
    {
      id: "status",
      label: "Status",
    },
  ];

  const rows = [
    {
      id: "1",
      name: "Security",
      last_submission: "12-12-2023",
      category: "Security",
      status: "DRAFT",
    },
    {
      id: "2",
      name: "OB",
      last_submission: "12-12-2023",
      category: "Kebersihan",
      status: "PUBLISHED",
    },
  ];

  return (
    <HContainer>
      <HCommonContent
        headerTitle="Lowongan Pekerjaan"
        infoTitle="Total Lowongan"
        total="11"
        selectTitle="Filter Berdasar Kategori"
        searchLabel="Cari Lowongan"
        buttonTitle="Tambah"
        headCells={headCells}
        onClickDetail={(selectedCareer) => goToCareerDetail(selectedCareer)}
        rows={rows}
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
