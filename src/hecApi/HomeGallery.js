const API_URL_HOME_GALLERY =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_HOME_GALLERY_PROD
    : process.env.REACT_APP_API_URL_HOME_GALLERY_DEV;

export default class HomeGalleryApi {
  static getAllHomeGallery = (search, page, limit, filterBy) => {
    const url = new URL(`${API_URL_HOME_GALLERY}/all`);
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

  static getOneHomeGallery = (id) => {
    const url = new URL(`${API_URL_HOME_GALLERY}/${id}`);
    return url.toString();
  };

  static postHomeGallery = () => {
    const url = new URL(`${API_URL_HOME_GALLERY}/create`);
    return url.toString();
  };

  static updateHomeGalleryStatus = (id) => {
    const url = new URL(`${API_URL_HOME_GALLERY}/update/${id}`);
    return url.toString();
  };

  static deleteHomeGallery = () => {
    const url = new URL(`${API_URL_HOME_GALLERY}/delete`);
    return url.toString();
  };
}
