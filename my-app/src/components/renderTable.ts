import type { User } from "../types/user";

export function renderTable(
  data: User[],
  tableBody: HTMLTableSectionElement,
  editRow: number | null
): void {

  tableBody.innerHTML = "";

  data.forEach((user, index) => {

    const isEditing = editRow === index;

    const row = `
      <tr class="${isEditing ? "editing-row" : ""}">
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.gender}</td>

        <td>
          <button
            class="action-button edit-button"
            onclick="editData(${index})"
            title="Edit"
          >
            <i class="fa-solid fa-pen"></i>
          </button>

          <button
            class="action-button delete-button"
            onclick="deleteData(${index})"
            title="Delete"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}