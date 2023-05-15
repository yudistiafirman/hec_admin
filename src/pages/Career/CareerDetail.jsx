import React, { useEffect, useState } from "react";
import HCommmonDetails from "../../components/templates/HCommmonDetails";
import { useParams } from "react-router-dom";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { CircularProgress } from "@mui/material";
import { getOneJob } from "../../asyncActions/jobActions";

const CareerDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);

  const { careerId } = params;
  useEffect(() => {
    getCareerDetail();
  }, []);
  const getCareerDetail = async () => {
    try {
      setLoading(true);
      const response = await getOneJob(careerId);
      if (response.data.success) {
        setLoading(false);
        setDetails(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };
  if (loading) {
    return <CircularProgress size={50} sx={{ margin: "auto" }} />;
  }
  return (
    <HCommmonDetails
      detailsTitle={details?.name}
      descTitle="Deskripsi Pekerjaan"
      desc={details?.description}
      responsibilities={details?.responsibilities}
      responsibilitiesTitle="Tanggung Jawab Pekerjaan"
      requirementsTitle="Persyaratan Pekerjaan"
      requirements={details?.requirements}
      createdAtTitle="Tanggal Dibuat"
      createdAt={details?.created_at}
      lastSubmissionTitle="Tanggal Penyerahan Terakhir"
      lastSubmission={details?.last_submission}
      categoryTitle="Kategori Pekerjaan"
      category={details?.category_name}
      typeTitle="Tipe Pekerjaan"
      type={details?.type_name}
      image={details?.file_url}
      locationTitle="Lokasi Pekerjaan"
      location={details?.location}
      salaryRangeTitle="Kisaran Gaji"
      salaryRange={details?.salary_range}
      statusTitle="Status"
      status={details?.status_name}
    />
  );
};

export default CareerDetail;
