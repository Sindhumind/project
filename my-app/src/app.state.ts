import type { AppState } from "./types";

export const state: AppState = {
  users: [],
  search: "",
  sortField: null,
  isSearching: false,
  sortOrder: "asc",
  form: {
    name: "",
    email: "",
    phone: "",
    gender: "",
    editId: null,
  },
};