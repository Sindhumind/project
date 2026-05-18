import type { User } from "../types/user";
import { renderTable } from "../components/renderTable";

export function filterUsers(users: User[], value: string): User[] {
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value) ||
      user.gender.toLowerCase().includes(value)
    );
  });
}

// SEARCH
 
  export function initializeSearch(
  searchInput: HTMLInputElement,
  users: User[],
  tableBody: HTMLTableSectionElement,
  editRow: number | null
): void {searchInput.addEventListener("input", () => {
 
   const value = searchInput.value.toLowerCase();
 
   const filteredUsers = filterUsers(users, value);
 
   renderTable(filteredUsers, users, tableBody, editRow);
 });
}