import { create } from "zustand";

export const useBackdropStore = create((set) => ({
  openBackdrop: false,
  setBackdrop: (val) => set(() => ({ openBackdrop: val })),
}));
