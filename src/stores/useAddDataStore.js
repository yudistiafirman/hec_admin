import dayjs from "dayjs";
import { create } from "zustand";

export const useAddDataStore = create((set, get) => ({
  step: 0,
  image: null,
  description: "",
  firstSection: [
    {
      label: "Tanggung Jawab",
      value: "",
    },
  ],
  secondSection: [
    {
      label: "Persyaratan",
      value: "",
    },
  ],
  dateValue: dayjs(),
  employmentType: "",
  salaryRange: "",
  jobCategory: "",
  status: "",
  jobStatus: "",
  jobLocation: "",
  increaseStep: () => set((state) => ({ step: state.step + 1 })),
  decreaseStep: () => set((state) => ({ step: state.step - 1 })),
  onChangeFile: (e) => set(() => ({ image: e.target.files[0] })),
  onChangeDesc: (e) => set(() => ({ description: e.target.value })),
  onChangeDate: (dateValue) => set(() => ({ dateValue: dateValue })),
  onChangeEmploymentType: (e) => {
    set(() => ({ employmentType: e.target.value }));
  },

  onChangeSalaryRange: (e) => set(() => ({ salaryRange: e.target.value })),
  onChangeJobCategory: (e) => set(() => ({ jobCategory: e.target.value })),
  onChangeStatus: (e) => set(() => ({ status: e.target.value })),
  onChangeJobStatus: (e) => set(() => ({ jobStatus: e.target.value })),
  onChangeJobLocation: (e) => set(() => ({ jobLocation: e.target.value })),
  onAddFirstSection: () => {
    const newFirstSection = [
      ...get().firstSection,
      { label: "Tanggung Jawab", value: "" },
    ];
    set(() => ({ firstSection: newFirstSection }));
  },
  onRemoveFirstSection: () => {
    const newFirstSection = [...get().firstSection].filter(
      (v, i) => i !== get().firstSection.length - 1
    );

    set(() => ({ firstSection: newFirstSection }));
  },
  onAddSecondSection: () => {
    const newSecondSection = [
      ...get().secondSection,
      { label: "Persyaratan", value: "" },
    ];
    set(() => ({ secondSection: newSecondSection }));
  },
  onRemoveSecondSection: () => {
    const newSecondSection = [...get().secondSection].filter(
      (v, i) => i !== get().secondSection.length - 1
    );

    set(() => ({ secondSection: newSecondSection }));
  },
  onChangeFirstSection: (e, i) => {
    const newFirstSectionValue = [...get().firstSection].map((v, idx) => {
      if (idx === i) {
        return { ...v, value: e.target.value };
      } else {
        return { ...v };
      }
    });
    set(() => ({ firstSection: newFirstSectionValue }));
  },
  onChangeSecondSection: (e, i) => {
    const newSecondSectionValue = [...get().secondSection].map((v, idx) => {
      if (idx === i) {
        return { ...v, value: e.target.value };
      } else {
        return { ...v };
      }
    });
    set(() => ({ secondSection: newSecondSectionValue }));
  },
}));
