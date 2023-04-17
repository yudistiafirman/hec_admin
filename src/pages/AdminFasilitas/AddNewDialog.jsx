import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import {
  AiFillPicture,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";
const AddNewDialog = ({ open, onClose, onGetFasilitasData }) => {
  const [showImage, SetShowImages] = useState(null);
  const [fasilitasName, setFasilitasName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [selectedFile, setSelectedFile] = useState([
    {
      image: "",
    },
  ]);
  const [preview, setPreview] = useState([
    {
      image: "",
    },
  ]);
  const onAddFasilitas = () => {
    if (!fasilitasName) {
      alert("fasilitas tidak boleh kosong");
    } else if (!descriptions) {
      alert("deskripsi tidak boleh kosong");
    } else if (!selectedFile[0].image) {
      alert("fasilitas image tidak boleh kosong");
    } else {
      const data = new FormData();
      data.append("name", fasilitasName);
      data.append("descriptions", descriptions);
      for (var i = 0; i < selectedFile.length; i++) {
        if (selectedFile[i].image !== "") {
          data.append("images", selectedFile[i].image);
        }
      }
      axios.post(`${apiUrl}/fasilitas/post`, data).then((response) => {
        if (response.data.error) {
          onClose();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setFasilitasName("");
          setDescriptions("");
          setSelectedFile({ image: "" });
        } else {
          onClose();
          Swal.fire({
            icon: "success",
            title: "Penambahan fasilitas terbaru sukses",
            text: "Penambahan fasilitas terbaru terbaru berhasil",
          });
          setFasilitasName("");
          setDescriptions("");
          setSelectedFile([{ image: "" }]);
          onGetFasilitasData();
        }
      });
    }
  };

  const onChangeFile = (e, i) => {
    let newArr = [...selectedFile];
    let newArrPrev = [...preview];

    // I've kept this example simple by using the first image instead of multiple
    newArr[i].image = e.target.files[0];
    newArrPrev[i].image = URL.createObjectURL(e.target.files[0]);
    setSelectedFile(newArr);
    setPreview(newArrPrev);
  };

  const onAddPicture = () => {
    let prevIndex = selectedFile.length - 1;
    if (selectedFile[prevIndex].image) {
      if (selectedFile.length < 3) {
        setSelectedFile([...selectedFile, { image: "" }]);
        setPreview([...preview, { image: "" }]);
      } else {
        alert("Penambahan image telah mencapai batas maksimal");
      }
    } else {
      alert(`image ke ${selectedFile.length} tidak boleh kosong`);
    }
  };

  const onDeletePicture = (image, index) => {
    const newArrPrev = preview.filter((v, i) => i !== index);
    const newArr = selectedFile.filter((v, i) => i !== index);

    setPreview(newArrPrev);
    setSelectedFile(newArr);
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
      <DialogTitle>Tambahkan Fasilitas</DialogTitle>
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
              label="Nama Fasilitas"
              value={fasilitasName}
              helperText={`${fasilitasName.length}/45`}
              onChange={onChangeFasilitasName}
              variant="outlined"
            />
          </div>
          <div style={{ width: "50ch" }}>
            <TextField
              id="filled-multiline-flexible"
              label="Deskripsi Fasilitas"
              multiline
              fullWidth
              helperText={`${descriptions.length}/500`}
              value={descriptions}
              onChange={onChangeDescriptions}
              maxRows={5}
              variant="outlined"
            />
          </div>
          {selectedFile.length > 0 &&
            selectedFile.map((value, idx) => {
              return (
                <div
                  style={{
                    width: "300px",
                    marginLeft: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <DialogContentText>*Fasilitas Image</DialogContentText>
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
                      marginBottom: "10px",
                    }}
                  >
                    {value.image ? (
                      <div
                        onClick={() =>
                          SetShowImages(URL.createObjectURL(value.image))
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${URL.createObjectURL(
                            value.image
                          )})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <AiFillPicture
                        style={{ color: "#C4C4C4" }}
                        size="large"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={(e) => onChangeFile(e, idx)}
                    accept="image/*"
                  />
                  <div>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {idx > 0 && (
                        <AiOutlineMinusSquare
                          onClick={() => onDeletePicture(value.image, idx)}
                          color="#ffa726"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                    <AiOutlinePlusSquare
                      onClick={onAddPicture}
                      color="#29b6f6"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              );
            })}
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
