import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";
import moment from "moment";

const AdminPelatihanDetail = ({ openDetail, closeDetail, careerId }) => {
  const [careerDetail, SetCareerDetail] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/pelatihan/detail?id=${careerId}`).then((response) => {
      if (response.data.error) {
        closeDetail();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } else {
        SetCareerDetail(response.data.data);
      }
    });
    return () => {
      SetCareerDetail([]);
    };
  }, []);
  return (
    <div>
      <Dialog open={openDetail} onClose={closeDetail}>
        <DialogContent style={{ minWidth: "500px" }}>
          {careerDetail.length > 0 && (
            <div className="detailContentContainer">
              <div className="detailTitleContainer">
                <div className="detailTitle">{careerDetail[0].name}</div>
              </div>
              <div style={{ width: "50%" }} className="titleCategory">
                <div>
                  {`${moment(careerDetail[0].start_date).format(
                    "Do MMMM YYYY"
                  )} - ${moment(careerDetail[0].end_date).format(
                    "Do MMMM YYYY"
                  )}`}
                </div>
              </div>
              <div style={{ justifyContent: "center" }} className="detailDesc">
                {careerDetail[0].descriptions}
              </div>
              <div className="advantagesPelatihanContainer">
                <div className="advantagesPelatihanInnerContainer">
                  <div className="nilaiPlusContainer">
                    <div className="nilaiPlustitle">Nilai Plus</div>
                    {careerDetail[0].nilaiPlus[0].nilai_1 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_1}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_2 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_2}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_3 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_3}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_4 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_4}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_5 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_5}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_6 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_6}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_7 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_7}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_8 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_8}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_9 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_9}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].nilaiPlus[0].nilai_10 !== null && (
                      <div
                        style={{ alignItems: "center" }}
                        className="checkListContainer"
                      >
                        {/* <img
                          src={CheckIcon}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "7px",
                            marginRight: "5px",
                          }}
                        /> */}
                        <div className="checkDesc">
                          {careerDetail[0].nilaiPlus[0].nilai_10}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPelatihanDetail;
