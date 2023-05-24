import FacilityApi from "../hecApi/Facililty";
import { apiRequest } from "../networking/request";

export const getAllFacility = async (search, page, limit, filterBy) => {
  return apiRequest(
    FacilityApi.getAllFacility(search, page, limit, filterBy),
    "GET"
  );
};

export const getOneFacility = async (id) => {
  return apiRequest(FacilityApi.getOneFacility(id), "GET");
};

export const postFacility = async (data) => {
  return apiRequest(FacilityApi.postFacility(), "POST", data);
};

export const updateFacilityStatus = async (id, data) => {
  return apiRequest(FacilityApi.updateFacilityStatus(id), "PUT", data);
};

export const deleteFacility = async (data) => {
  return apiRequest(FacilityApi.deleteFacility(), "PUT", data);
};
