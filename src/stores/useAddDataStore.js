import dayjs from "dayjs";
import { create } from "zustand";

const initialState = {
	step: 0,
	image: null,
	name: "",
	email: "",
	nis: "",
	phoneNumber: "",
	address: "",
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
	plusValues: [
		{
			label: "Nilai Plus Pelatihan",
			value: "",
		},
	],
	dateValue: dayjs(),
	endDateValue: dayjs(),
	categoryData: [],
	employmentType: "",
	salaryRange: "",
	category: "",
	status: "",
	textCategory: "",
	jobLocation: "",
};

export const useAddDataStore = create((set, get) => ({
	...initialState,
	onChangeName: (e) => set(() => ({ name: e.target.value })),
	onChangeEmail: (e) => set(() => ({ email: e.target.value })),
	onChangeNis: (e) => set(() => ({ nis: e.target.value })),
	onChangePhoneNumber: (e) => set(() => ({ phoneNumber: e.target.value })),
	onChangeAddress: (e) => set(() => ({ address: e.target.value })),
	increaseStep: () => set((state) => ({ step: state.step + 1 })),
	decreaseStep: () => set((state) => ({ step: state.step - 1 })),
	onChangeFile: (e) => set(() => ({ image: e.target.files[0] })),
	onChangeDesc: (e) => set(() => ({ description: e.target.value })),
	onChangeDate: (dateValue) => set(() => ({ dateValue: dateValue })),
	onChangeEndDate: (dateValue) => set(() => ({ endDateValue: dateValue })),
	onChangeEmploymentType: (e) => {
		set(() => ({ employmentType: e.target.value }));
	},
	onChangeTextCategory: (e) =>
		set(() => ({ textCategory: e.target.value, jobCategory: "" })),

	onChangeCategoryData: (newCategoryData) =>
		set(() => ({ categoryData: newCategoryData })),

	onChangeSalaryRange: (e) => set(() => ({ salaryRange: e.target.value })),
	onChangeCategory: (e) =>
		set(() => ({ category: e.target.value, textCategory: "" })),
	onChangeStatus: (e) => set(() => ({ status: e.target.value })),
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
	onAddPlusValues: () => {
		const newPlusValues = [
			...get().plusValues,
			{ label: "Nilai Plus Pelatiah", value: "" },
		];
		set(() => ({ plusValues: newPlusValues }));
	},
	onRemovePlusValues: () => {
		const newPlusValues = [...get().plusValues].filter(
			(v, i) => i !== get().plusValues.length - 1
		);

		set(() => ({ plusValues: newPlusValues }));
	},
	onChangePlusValues: (e, i) => {
		const newPlusValues = [...get().plusValues].map((v, idx) => {
			if (idx === i) {
				return { ...v, value: e.target.value };
			} else {
				return { ...v };
			}
		});
		set(() => ({ plusValues: newPlusValues }));
	},
	reset: () => {
		set(initialState);
	},
}));
