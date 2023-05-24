import PartnershipGalleryApi from "../hecApi/PartnershipGallery";
import { apiRequest } from "../networking/request";

export const getAllPartnershipGallery = async (
  search,
  page,
  limit,
  filterBy
) => {
  return apiRequest(
    PartnershipGalleryApi.getAllPartnershipGallery(
      search,
      page,
      limit,
      filterBy
    ),
    "GET"
  );
};

export const getOnePartnershipGallery = async (id) => {
  return apiRequest(PartnershipGalleryApi.getOnePartnershipGallery(id), "GET");
};

export const postPartnershipGallery = async (data) => {
  return apiRequest(
    PartnershipGalleryApi.postPartnershipGallery(),
    "POST",
    data
  );
};

export const updatePartnershipGalleryStatus = async (id, data) => {
  return apiRequest(
    PartnershipGalleryApi.updatePartnershipGalleryStatus(id),
    "PUT",
    data
  );
};

export const deletePartnershipGallery = async (data) => {
  return apiRequest(
    PartnershipGalleryApi.deletePartnershipGallery(),
    "PUT",
    data
  );
};
