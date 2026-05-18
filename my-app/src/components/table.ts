import type { User } from "../types/user";
import { saveUsers } from "../services/storage";
import { renderTable } from "./renderTable"; 
import { getGender } from "../utils/gender";
 
 export function Table() {
  return `
    <div id="reg-table">
        <h2>Registered Users</h2>

        <input type="text" id="search-input" placeholder="Search...">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                            <span class="sort-container">
                            <i id="asc-0" class="fa-solid fa-sort-up sort-icon" onclick="sortTable(0, 'asc')" style="line-height: 0.4;"></i>
                            <i id="desc-0" class="fa-solid fa-sort-down sort-icon" onclick="sortTable(0, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Email
                            <span class="sort-container">
                                <i id="asc-1" class="fa fa-sort-up sort-icon" onclick="sortTable(1, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-1" class="fa fa-sort-down sort-icon" onclick="sortTable(1, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Phone
                            <span class="sort-container"></i>
                                <i id="asc-2" class="fa fa-sort-up sort-icon" onclick="sortTable(2, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-2" class="fa fa-sort-down sort-icon" onclick="sortTable(2, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>

                        <th>
                            Gender
                            <span class="sort-container"></i>
                                <i id="asc-3" class="fa fa-sort-up sort-icon" onclick="sortTable(3, 'asc')" style="line-height: 0.4;"></i>
                                <i id="desc-3" class="fa fa-sort-down sort-icon" onclick="sortTable(3, 'desc')" style="line-height: 0.4;"></i>
                            </span>
                        </th>
                        <th id = "action-column">Actions</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>
            </table>
        </div>
    </div>`;

  }
  // DELETE USER
 
export function deleteData(
  index: number,
  users: User[],
  getEditRow: () => number | null,
  setEditRow: (value: number | null) => void,
  clearForm: () => void,
  tableBody: HTMLTableSectionElement
): void {

  if (confirm("Delete record?")) {

    users.splice(index, 1);

    // Current edit row
    const currentEditRow = getEditRow();

    // Reset edit row if deleted row was editing
    if (currentEditRow === index) {

      setEditRow(null);

      clearForm();
    }

    // Adjust edit row index after delete
    else if (
      currentEditRow !== null &&
      currentEditRow > index
    ) {

      setEditRow(currentEditRow - 1);
    }

    saveUsers(users);

    renderTable(
      users,
      users,
      tableBody,
      getEditRow()
    );
  }
}

// ADD USER

export function addUser(
  users: User[],
  nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  phoneInput: HTMLInputElement,
  tableBody: HTMLTableSectionElement,
  getEditRow: () => number | null
): void {
  const user: User = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  users.push(user);

  saveUsers(users);

  renderTable(users, users, tableBody, getEditRow());
}


// UPDATE USER

export function updateUser(
  users: User[],
  nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  phoneInput: HTMLInputElement,
  tableBody: HTMLTableSectionElement,
  getEditRow: () => number | null,
  setEditRow: (value: number | null) => void
): void {
  const editRow = getEditRow();
  if (editRow === null) return;

  users[editRow] = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  setEditRow(null);

  saveUsers(users);

  renderTable(users, users, tableBody, getEditRow());
}