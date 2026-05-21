import { state } from "./app.state";
import type { AppTypes } from "./types";
type User = AppTypes["User"];
const STORAGE_KEY = "users";

function loadUsers(): void {
  const users = JSON.parse( localStorage.getItem(STORAGE_KEY) || "[]") as User[];
  state.users = users;
}

function saveUsers(): void {
  localStorage.setItem( STORAGE_KEY, JSON.stringify(state.users) );
}

export const storage = { loadUsers, saveUsers };