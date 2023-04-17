import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";
const AddNewDialog = ({ open, onClose, onGetFasilitasData }) => {
  const [fasilitasName, setFasilitasName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [selectedFile, setSelectedFile] = useState([
    {
      image: "",
    },
  ]);
  const [selectedIndex, setSelectedInex] = useState(0);
  const [preview, setPreview] = useState([
    {
      image: "",
    },
  ]);
  const [kualifikasiForm, SetKualifikasiForm] = useState([
    {
      labelTitle: "Nama Alat Berat",
      titleValue: "",
      labelDesc: "Deskripsi",
      descValue: "",
    },
  ]);
  const onAddFasilitas = () => {
    if (!fasilitasName) {
      alert("fasilitas tidak boleh kosong");
    } else if (!descriptions) {
      alert("deskripsi tidak boleh kosong");
    } else if (
      !kualifikasiForm[0].titleValue &&
      !kualifikasiForm[0].descValue
    ) {
      alert(
        "paling sedikit 1 nama scope services dan 1 deskripsi scope services harus diisi"
      );
    } else {
      const data = {};
      const jasaToSend = [];
      kualifikasiForm.map((v, i) => {
        if (v.titleValue !== "" && v.descValue !== "") {
          jasaToSend.push({ title: v.titleValue, descriptions: v.descValue });
        }
      });
      data.title = fasilitasName;
      data.descriptions = descriptions;
      data.sparepart = jasaToSend;
      axios.post(`${apiUrl}/alat/post`, data).then((response) => {
        if (response.data.error) {
          onClose();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setFasilitasName("");
          setDescriptions("");
          SetKualifikasiForm([
            {
              labelTitle: "Nama Alat Berat",
              titleValue: "",
              labelDesc: "Deskripsi",
              descValue: "",
            },
          ]);
        } else {
          onClose();
          Swal.fire({
            icon: "success",
            title: "Penambahan alat berat terbaru sukses",
            text: "Penambahan alat berat terbaru terbaru berhasil",
          });
          setFasilitasName("");
          setDescriptions("");
          setSelectedFile([
            {
              labelTitle: "Nama Alat Berat",
              titleValue: "",
              labelDesc: "Deskripsi",
              descValue: "",
            },
          ]);
          onGetFasilitasData();
        }
      });
    }
  };
  const onChangeKualifikasiForm = (e, i, name) => {
    if (name === "title") {
      if (e.target.value.length <= 45) {
        let newArr = [...kualifikasiForm];
        newArr[i].titleValue = e.target.value;
        SetKualifikasiForm(newArr);
      }
    } else {
      if (e.target.value.length <= 500) {
        let newArr = [...kualifikasiForm];
        newArr[i].descValue = e.target.value;
        SetKualifikasiForm(newArr);
      }
    }
  };

  const onDeleteKualifikasiForm = (i) => {
    const newFormKualifikasi = kualifikasiForm.filter((v, idx) => idx !== i);
    SetKualifikasiForm(newFormKualifikasi);
  };

  const onAddKualifikasi = (idx) => {
    let prevIdx = kualifikasiForm.length - 1;
    if (
      kualifikasiForm[prevIdx].titleValue &&
      kualifikasiForm[prevIdx].descValue
    ) {
      if (kualifikasiForm.length < 7) {
        SetKualifikasiForm([
          ...kualifikasiForm,
          {
            labelTitle: "Nama  Alat Berat",
            titleValue: "",
            labelDesc: "Deskripsi",
            descValue: "",
          },
        ]);
      } else {
        alert("Penambahan Alat Berat telah mencapai batas");
      }
    } else {
      alert(
        `Nama Alat Berat dan deskripsi ke ${kualifikasiForm.length} tidak boleh kosong`
      );
    }
  };

  const onChangeFasilitasName = (e) => {
    if (e.target.value.length < 45) {
      setFasilitasName(e.target.value);
    }
  };

  const onChangeDescriptions = (e) => {
    if (e.target.value.length < 500) {
      setDescriptions(e.target.value);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tambahkan Alat Berat</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ width: "300px" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Nama Alat Berat"
              value={fasilitasName}
              helperText={`${fasilitasName.length}/45`}
              onChange={onChangeFasilitasName}
              variant="outlined"
            />
          </div>
          <div style={{ width: "50ch" }}>
            <TextField
              id="filled-multiline-flexible"
              label="Deskripsi Alat Berat"
              multiline
              fullWidth
              helperText={`${descriptions.length}/500`}
              value={descriptions}
              onChange={onChangeDescriptions}
              maxRows={5}
              variant="outlined"
            />
          </div>
          <div style={{ marginLeft: "5px", marginTop: "20px" }}>
            <DialogContentText>*Spare Part Alat Berat</DialogContentText>
            {kualifikasiForm.length > 0 &&
              kualifikasiForm.map((v, i) => {
                return (
                  <div style={{ width: "50ch", marginTop: "20px" }}>
                    <TextField
                      id="filled-multiline-flexible"
                      label={v.labelTitle}
                      multiline
                      fullWidth
                      maxRows={4}
                      variant="outlined"
                      value={kualifikasiForm[i].titleValue}
                      onChange={(e) => onChangeKualifikasiForm(e, i, "title")}
                      helperText={`${kualifikasiForm[i].titleValue.length}/45`}
                    />
                    <TextField
                      id="filled-multiline-flexible"
                      label={v.labelDesc}
                      multiline
                      fullWidth
                      maxRows={4}
                      variant="outlined"
                      value={kualifikasiForm[i].descValue}
                      onChange={(e) => onChangeKualifikasiForm(e, i, "desc")}
                      helperText={`${kualifikasiForm[i].descValue.length}/500`}
                    />
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {i > 0 && (
                        <AiOutlineMinusSquare
                          onClick={() => onDeleteKualifikasiForm(i)}
                          color="#ffa726"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            <div>
              <AiOutlinePlusSquare
                onClick={() => onAddKualifikasi()}
                color="#29b6f6"
                style={{ width: "25px", height: "25px", cursor: "pointer" }}
              />
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddFasilitas}>Tambahkan</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewDialog;
