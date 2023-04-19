import { create } from "zustand";
import { loginUser } from "../asyncActions/AuthActions";

export const useUserStore = create((set, get) => ({
  email: "",
  password: "",
  userData: "",
  setEmail: (email) => set(() => ({ email: email })),
  setPassword: (password) => set(() => ({ password: password })),
  loggedIn: async () => {
    try {
      const data = {
        email: get().email,
        password: get().password,
      };
      const response = await loginUser(data);
      set({ userData: response.data.data });
    } catch (error) {
      console.log("ini error", error);
    }
  },
}));
