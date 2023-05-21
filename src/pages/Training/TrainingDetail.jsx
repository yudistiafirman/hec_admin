import React, { useEffect, useState } from "react";
import HCommmonDetails from "../../components/templates/HCommmonDetails";
import { useParams } from "react-router-dom";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { CircularProgress } from "@mui/material";
import { getOneTraining } from "../../asyncActions/TrainingActions";

const TrainingDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);

  const { trainingId } = params;
  useEffect(() => {
    getTrainingDetail();
  }, []);
  const getTrainingDetail = async () => {
    try {
      setLoading(true);
      const response = await getOneTraining(trainingId);

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
      descTitle="Deskripsi Pelatihan"
      desc={details?.descriptions}
      requirementsTitle="Nilai Plus Pelatihan"
      requirements={details?.plusValues}
      createdAtTitle="Tanggal Dimulai Pelatihan "
      createdAt={details?.start_date}
      lastSubmissionTitle="Tanggal Berakhir Pelatihan"
      lastSubmission={details?.end_date}
      categoryTitle="Kategori Pelatihan"
      category={details?.category_name}
      image={details?.file_url}
      statusTitle="Status Pelatihan"
      isFullTitle="Ketersediaan Pelatihan"
      isFull={details?.isFull}
      status={details?.status_name}
    />
  );
};

export default TrainingDetail;
