import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Career.css";

import HContainer from "../../components/atoms/HContainer";
import HCommonContent from "../../components/templates/HCommonContent";
import { useNavigate, useParams } from "react-router-dom";
import { CAREER_TABLE_HEAD_CELLS } from "../../constant";

const Career = () => {
  const navigate = useNavigate();
  const params = useParams();

  const goToCareerDetail = (selectedCareer) => {
    const careerId = selectedCareer[0];
    navigate(`/career/detail/${careerId}`);
  };

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
        onAdd={() => navigate("/career/add")}
        headCells={CAREER_TABLE_HEAD_CELLS}
        onClickDetail={(selectedCareer) => goToCareerDetail(selectedCareer)}
        rows={rows}
      />
    </HContainer>
  );
};

export default Career;
