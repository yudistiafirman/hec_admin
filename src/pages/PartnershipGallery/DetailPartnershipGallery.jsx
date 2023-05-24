import React, { useEffect, useState } from "react";
import HCommmonDetails from "../../components/templates/HCommmonDetails";
import { useParams } from "react-router-dom";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { CircularProgress } from "@mui/material";
import { getOnePartnershipGallery } from "../../asyncActions/PartnershipGalleryActions";

const PartnershipGalleryDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);

  const { partnershipGalleryId } = params;
  useEffect(() => {
    getPartnershipGalleryDetail();
  }, []);
  const getPartnershipGalleryDetail = async () => {
    try {
      setLoading(true);
      const response = await getOnePartnershipGallery(partnershipGalleryId);
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
      createdAtTitle="Tanggal Dibuat"
      createdAt={details?.created_at}
      image={details?.file_url}
      statusTitle="Status"
      status={details?.status_name}
    />
  );
};

export default PartnershipGalleryDetail;
