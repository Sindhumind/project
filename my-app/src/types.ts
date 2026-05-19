export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export interface FormState {
  name: string;
  email: string;
  phone: string;
  gender: string;
  editId: number | null;
}

export interface AppState {
  users: User[];
  search: string;
  sortField: keyof User | null;
  sortOrder: "asc" | "desc";
  isSearching: boolean;

  form: FormState;
}