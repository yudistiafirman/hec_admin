import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";
import moment from "moment";

const AdminCareerDetail = ({ openDetail, closeDetail, careerId }) => {
  const [careerDetail, SetCareerDetail] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/vacancies/detail?id=${careerId}`).then((response) => {
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
                <div className="detailTitle">{careerDetail[0].job_name}</div>
              </div>
              <div style={{ width: "30%" }} className="titleCategory">
                <div>
                  {moment(careerDetail[0].last_submission).format(
                    "Do MMMM YYYY"
                  )}
                </div>
              </div>
              <div style={{ justifyContent: "center" }} className="detailDesc">
                {careerDetail[0].job_description}
              </div>
              <div className="advantagesPelatihanContainer">
                <div className="advantagesPelatihanInnerContainer">
                  <div className="nilaiPlusContainer">
                    <div className="nilaiPlustitle">Kualifikasi</div>
                    {careerDetail[0].qualifications[0].qualifications_1 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_1}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_2 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_2}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_3 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_3}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_4 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_4}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_5 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_5}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_6 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_6}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_7 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_7}
                        </div>
                      </div>
                    )}
                    {careerDetail[0].qualifications[0].qualifications_8 !==
                      null && (
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
                          {careerDetail[0].qualifications[0].qualifications_8}
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

export default AdminCareerDetail;
