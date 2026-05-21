interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
}
interface FormState {
  name: string;
  email: string;
  phone: string;
  gender: string;
  editId: number | null;
}
interface AppState {
  users: User[];
  search: string;
  sortField: keyof User | null;
  sortOrder: "asc" | "desc";
  isSearching: boolean;
  form: FormState;
}

export type AppTypes = {
  User: User;
  FormState: FormState;
  AppState: AppState;
};