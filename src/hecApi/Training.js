const API_URL_TRAINING =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_TRAINING_PROD
    : process.env.REACT_APP_API_URL_TRAINING_DEV;

export default class TrainingApi {
  static getAllTraining = (search, page, limit, filterBy, startDate) => {
    const url = new URL(`${API_URL_TRAINING}/all`);
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
    if (filterBy) {
      params.append("filterBy", filterBy);
    }
    if (startDate) {
      params.append("startDate", startDate);
    }

    return url.toString();
  };

  static getOneTraining = (id) => {
    const url = new URL(`${API_URL_TRAINING}/${id}`);
    return url.toString();
  };

  static getTrainingCategory = () => {
    const url = new URL(`${API_URL_TRAINING}/categories`);
    return url.toString();
  };

  static postTraining = () => {
    const url = new URL(`${API_URL_TRAINING}/create`);
    return url.toString();
  };

  static updateTrainingStatus = (id) => {
    const url = new URL(`${API_URL_TRAINING}/update/${id}`);
    return url.toString();
  };

  static deleteTraining = () => {
    const url = new URL(`${API_URL_TRAINING}/delete`);
    return url.toString();
  };

  static updatePopularTraining = (id) => {
    const url = new URL(`${API_URL_TRAINING}/update-popular/${id}`);
    return url.toString();
  };

  static updateFullTraining = (id) => {
    const url = new URL(`${API_URL_TRAINING}/update-full/${id}`);
    return url.toString();
  };
}
