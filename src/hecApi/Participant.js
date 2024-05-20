const API_URL_PARTICIPANT =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_PARTICIPANT_PROD
		: process.env.REACT_APP_API_URL_PARTICIPANT_DEV;

export default class ParticipantApi {
	static getAllParticipant = (search, page, limit) => {
		const url = new URL(`${API_URL_PARTICIPANT}/all`);
		const params = url.searchParams;
		if (search) {
			params.append("search", search);
		}
		if (page) {
			params.append("page", page);
		}
		if (limit) {
			params.append("limit", limit);
		}
		return url.toString();
	};

	static getOneParticipant = (id) => {
		const url = new URL(`${API_URL_PARTICIPANT}/${id}`);
		return url.toString();
	};

	static createParticipant = () => {
		const url = new URL(`${API_URL_PARTICIPANT}/create`);
		return url.toString();
	};

	static deleteParticipant = () => {
		const url = new URL(`${API_URL_PARTICIPANT}/delete`);
		return url.toString();
	};

	static createCertificate = (id) => {
		const url = new URL(`${API_URL_PARTICIPANT}/create/certificate/${id}`);
		return url.toString();
	};

	static deleteCertificate = () => {
		const url = new URL(`${API_URL_PARTICIPANT}/delete/certificate`);
		return url.toString();
	};

	static searchCertificate = (searchValue) => {
		const url = new URL(`${API_URL_PARTICIPANT}/search/certificate`);
		const params = url.searchParams;
		if (searchValue) {
			params.append("certificateNumber", searchValue);
		}
		return url.toString();
	};
}
