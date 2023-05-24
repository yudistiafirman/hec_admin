import TrainingGalleryApi from "../hecApi/TrainingGallery";
import { apiRequest } from "../networking/request";

export const getAllTrainingGallery = async (search, page, limit, filterBy) => {
  return apiRequest(
    TrainingGalleryApi.getAllTrainingGallery(search, page, limit, filterBy),
    "GET"
  );
};

export const getOneTrainingGallery = async (id) => {
  return apiRequest(TrainingGalleryApi.getOneTrainingGallery(id), "GET");
};

export const postTrainingGallery = async (data) => {
  return apiRequest(TrainingGalleryApi.postTrainingGallery(), "POST", data);
};

export const updateTrainingGalleryStatus = async (id, data) => {
  return apiRequest(
    TrainingGalleryApi.updateTrainingGalleryStatus(id),
    "PUT",
    data
  );
};

export const deleteTrainingGallery = async (data) => {
  return apiRequest(TrainingGalleryApi.deleteTrainingGallery(), "PUT", data);
};
