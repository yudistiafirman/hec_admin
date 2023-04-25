import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  email: "",
  password: "",
  userData: null,
  setEmail: (email) => set(() => ({ email: email })),
  setPassword: (password) => set(() => ({ password: password })),
  setUserData: (userData) => set(() => ({ userData: userData })),
}));
