const API_URL_AUTH =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_AUTH_PROD
    : process.env.REACT_APP_API_URL_AUTH_DEV;

export default class AuthApi {
  static register = () => {
    const url = `${API_URL_AUTH}/register`;
    return url;
  };

  static login = () => {
    const url = `${API_URL_AUTH}/login`;
    return url;
  };
}
