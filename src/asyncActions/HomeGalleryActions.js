import HomeGalleryApi from "../hecApi/HomeGallery";
import { apiRequest } from "../networking/request";

export const getAllHomeGallery = async (search, page, limit, filterBy) => {
  return apiRequest(
    HomeGalleryApi.getAllHomeGallery(search, page, limit, filterBy),
    "GET"
  );
};

export const getOneHomeGallery = async (id) => {
  return apiRequest(HomeGalleryApi.getOneHomeGallery(id), "GET");
};

export const postHomeGallery = async (data) => {
  return apiRequest(HomeGalleryApi.postHomeGallery(), "POST", data);
};

export const updateHomeGalleryStatus = async (id, data) => {
  return apiRequest(HomeGalleryApi.updateHomeGalleryStatus(id), "PUT", data);
};

export const deleteHomeGallery = async (data) => {
  return apiRequest(HomeGalleryApi.deleteHomeGallery(), "PUT", data);
};
