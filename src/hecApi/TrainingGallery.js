const API_URL_TRAINING_GALLERY =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_TRAINING_GALLERY_PROD
    : process.env.REACT_APP_API_URL_TRAINING_GALLERY_DEV;

export default class TrainingGalleryApi {
  static getAllTrainingGallery = (search, page, limit, filterBy) => {
    const url = new URL(`${API_URL_TRAINING_GALLERY}/all`);
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

  static getOneTrainingGallery = (id) => {
    const url = new URL(`${API_URL_TRAINING_GALLERY}/${id}`);
    return url.toString();
  };

  static postTrainingGallery = () => {
    const url = new URL(`${API_URL_TRAINING_GALLERY}/create`);
    return url.toString();
  };

  static updateTrainingGalleryStatus = (id) => {
    const url = new URL(`${API_URL_TRAINING_GALLERY}/update/${id}`);
    return url.toString();
  };

  static deleteTrainingGallery = () => {
    const url = new URL(`${API_URL_TRAINING_GALLERY}/delete`);
    return url.toString();
  };
}
