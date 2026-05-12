import type { User } from "../types/user";

export function saveUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export function loadUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}