import ParticipantApi from "../hecApi/Participant";
import { apiRequest } from "../networking/request";

export const getAllParticipant = async (search, page, limit) => {
	return apiRequest(
		ParticipantApi.getAllParticipant(search, page, limit),
		"GET"
	);
};

export const getOneParticipant = async (id) => {
	return apiRequest(ParticipantApi.getOneParticipant(id), "GET");
};

export const createParticipant = async (data) => {
	return apiRequest(ParticipantApi.createParticipant(), "POST", data);
};

export const deleteParticipant = async (data) => {
	return apiRequest(ParticipantApi.deleteParticipant(), "DELETE", data);
};

export const editParticipant = async (id, data) => {
	return apiRequest(ParticipantApi.editParticipant(id), "PUT", data);
};

export const editCertificate = async (id, data) => {
	return apiRequest(ParticipantApi.editCertificate(id), "PUT", data);
};

export const createCertificate = async (id, data) => {
	return apiRequest(ParticipantApi.createCertificate(id), "POST", data);
};

export const deleteCertificate = async (data) => {
	return apiRequest(ParticipantApi.deleteCertificate(), "DELETE", data);
};

export const searchCertificate = async (searchValue) => {
	return apiRequest(ParticipantApi.searchCertificate(searchValue), "GET");
};
