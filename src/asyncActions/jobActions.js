import JobApi from "../hecApi/Job";
import { apiRequest } from "../networking/request";

export const getAllJob = async (search, page, limit, filterBy) => {
  return apiRequest(JobApi.getAllJob(search, page, limit, filterBy), "GET");
};

export const getOneJob = async (id) => {
  return apiRequest(JobApi.getOneJob(id), "GET");
};

export const postJob = async (data) => {
  return apiRequest(JobApi.postJob(), "POST", data);
};

export const getCategories = async () => {
  return apiRequest(JobApi.getJobCategory(), "GET");
};

export const updateJobStatus = async (id, data) => {
  return apiRequest(JobApi.updateJobStatus(id), "PUT", data);
};

export const deleteJob = async (data) => {
  return apiRequest(JobApi.deleteJob(), "PUT", data);
};
