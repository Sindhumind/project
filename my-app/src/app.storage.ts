import { state } from "./app.state";
import type { User } from "./types";

const STORAGE_KEY = "users";

export function loadUsers(): void {
  const users = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  ) as User[];

  state.users = users;
}

export function saveUsers(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.users)
  );
}