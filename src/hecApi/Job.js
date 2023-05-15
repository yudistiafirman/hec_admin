const API_URL_JOB =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_JOB_PROD
    : process.env.REACT_APP_API_URL_JOB_DEV;

export default class JobApi {
  static getAllJob = (search, page, limit, filterBy) => {
    const url = new URL(`${API_URL_JOB}/get`);
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

    return url.toString();
  };

  static getOneJob = (id) => {
    const url = new URL(`${API_URL_JOB}/${id}`);
    return url.toString();
  };

  static getJobCategory = () => {
    const url = new URL(`${API_URL_JOB}/categories`);
    return url.toString();
  };

  static postJob = () => {
    const url = new URL(`${API_URL_JOB}/create`);
    return url.toString();
  };

  static updateJobStatus = (id) => {
    const url = new URL(`${API_URL_JOB}/update/${id}`);
    return url.toString();
  };
}
