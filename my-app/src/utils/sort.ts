import type { User } from "../types/user";
import { renderTable } from "../components/renderTable";

export function sortUsers(
  users: User[],
  colIndex: number,
  order: "asc" | "desc"
): User[] {
  const fields: (keyof User)[] = [
    "name",
    "email",
    "phone",
    "gender"
  ];

  const field = fields[colIndex];

  return users.sort((a, b) => {
    const x = a[field].toLowerCase();
    const y = b[field].toLowerCase();

    if (order === "asc") {
      return x.localeCompare(y);
    }

    return y.localeCompare(x);
  });
}
// SORTING
 export function initializeSort(
  users: User[],
  tableBody: HTMLTableSectionElement,
  editRow: number | null
): void {
  (window as any).sortTable = (colIndex: number, order: "asc" | "desc"): void => {
    users = sortUsers(users, colIndex, order);
    renderTable(users, users, tableBody, editRow);
  };
}