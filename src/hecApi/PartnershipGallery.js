const API_URL_PARTNERSHIP_GALLERY =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PARTNERSHIP_GALLERY_PROD
    : process.env.REACT_APP_API_URL_PARTNERSHIP_GALLERY_DEV;

export default class PartnershipGalleryApi {
  static getAllPartnershipGallery = (search, page, limit, filterBy) => {
    const url = new URL(`${API_URL_PARTNERSHIP_GALLERY}/all`);
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

  static getOnePartnershipGallery = (id) => {
    const url = new URL(`${API_URL_PARTNERSHIP_GALLERY}/${id}`);
    return url.toString();
  };

  static postPartnershipGallery = () => {
    const url = new URL(`${API_URL_PARTNERSHIP_GALLERY}/create`);
    return url.toString();
  };

  static updatePartnershipGalleryStatus = (id) => {
    const url = new URL(`${API_URL_PARTNERSHIP_GALLERY}/update/${id}`);
    return url.toString();
  };

  static deletePartnershipGallery = () => {
    const url = new URL(`${API_URL_PARTNERSHIP_GALLERY}/delete`);
    return url.toString();
  };
}
