import AuthApi from "../hecApi/Auth";
import { apiRequest } from "../networking/request";

export const loginUser = async (data) => {
  return apiRequest(AuthApi.login(), "POST", data);
};
