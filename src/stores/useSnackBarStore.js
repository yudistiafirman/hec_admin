import { create } from "zustand";

export const useSnackBarStore = create((set) => ({
  openSnackbar: false,
  type: "success",
  message: "",
  setOpenSnackbar: ({ openSnackbar, type, message }) =>
    set(() => ({ openSnackbar: openSnackbar, type: type, message: message })),
  handleCloseSnackbar: () => set(() => ({ openSnackbar: false })),
}));
