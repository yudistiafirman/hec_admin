import { create } from "zustand";

export const useReadStore = create((set, get) => ({
  page: 0,
  limit: 10,
  searchQuery: "",
  filterBy: "",
  loading: false,
  totalItems: 0,
  totalPage: 0,
  categories: [],
  selectedCategories: "",
  data: [],
  setCategories: (categories) => set(() => ({ categories: categories })),
  setSelectedCategories: (newCategory) => {
    set(() => ({ selectedCategories: newCategory }));
  },
  onChangeSearch: (e) => set(() => ({ searchQuery: e.target.value })),
  setData: (data) =>
    set(() => ({
      limit: data.limit,
      totalItems: data.totalItems,
      totalPage: data.totalPages,
      data: data.data,
    })),
  increasePage: (newPage) => set(() => ({ page: newPage })),
  enableLoading: () => set(() => ({ loading: true })),
  disableLoading: () => set(() => ({ loading: false })),
}));
