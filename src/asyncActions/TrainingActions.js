import TrainingApi from "../hecApi/Training";
import { apiRequest } from "../networking/request";

export const getAllTraining = async (
  search,
  page,
  limit,
  filterBy,
  startDate
) => {
  return apiRequest(
    TrainingApi.getAllTraining(search, page, limit, filterBy, startDate),
    "GET"
  );
};

export const getOneTraining = async (id) => {
  return apiRequest(TrainingApi.getOneTraining(id), "GET");
};

export const postTraining = async (data) => {
  return apiRequest(TrainingApi.postTraining(), "POST", data);
};

export const getTrainingCategories = async () => {
  return apiRequest(TrainingApi.getTrainingCategory(), "GET");
};

export const updateTrainingStatus = async (id, data) => {
  return apiRequest(TrainingApi.updateTrainingStatus(id), "PUT", data);
};

export const deleteTraining = async (data) => {
  return apiRequest(TrainingApi.deleteTraining(), "PUT", data);
};

export const updateFullTraining = async (id, data) => {
  return apiRequest(TrainingApi.updateFullTraining(id), "PUT", data);
};

export const updatePopularTraining = async (id, data) => {
  return apiRequest(TrainingApi.updatePopularTraining(id), "PUT", data);
};
