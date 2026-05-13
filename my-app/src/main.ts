import { Form } from "./components/form";
import { Table } from "./components/table";

import { loadUsers, saveUsers } from "./services/storage";
import { renderTable } from "./components/renderTable";

import { isValidEmail } from "./utils/validation";
import { getGender } from "./utils/gender";
import { isDuplicate } from "./utils/duplicate";

import { filterUsers } from "./components/search";
import { sortUsers } from "./components/sort";

import type { User } from "./types/user";

// APP UI

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <h1>Registration Page</h1>
  </header>

  <div id="main-container">
    ${Form()}
    ${Table()}
  </div>
`;

// ELEMENTS

const form = document.getElementById("registration-form") as HTMLFormElement;

const nameInput = document.getElementById("full-name") as HTMLInputElement;

const emailInput = document.getElementById("email-address") as HTMLInputElement;

const phoneInput = document.getElementById("phone-number") as HTMLInputElement;

const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;

const searchInput = document.getElementById("search-input") as HTMLInputElement;

// STATE
let users: User[] = loadUsers();
let editRow: number | null = null;

// INITIAL LOAD
 renderTable(users, tableBody, editRow);

// FORM SUBMIT
form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === ""
  ) {
    alert("Fill all fields");
    return;
  }

  if (!isValidEmail(emailInput.value)) {
    alert("Invalid email");
    return;
  }

  const gender = getGender();

  if (gender === "") {
    alert("Select gender");
    return;
  }

  if (editRow === null && isDuplicate(users, emailInput.value)) {
    alert("Email already exists");
    return;
  }

  if (editRow === null) {
    addUser();
  } else {
    updateUser();
  }

  clearForm();
});

// ADD USER

function addUser(): void {
  const user: User = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  users.push(user);

  saveUsers(users);

  renderTable(users, tableBody, editRow);
}

// EDIT USER

function editData(index: number): void {
  const user = users[index];

  editRow = index;

  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  const radios = document.getElementsByName(
    "gender"
  ) as NodeListOf<HTMLInputElement>;

  radios.forEach((radio) => {
    radio.checked = radio.value === user.gender;
  });

  // Re-render table to apply editing-row class
  renderTable(users, tableBody, editRow);
}

// UPDATE USER

function updateUser(): void {
  if (editRow === null) return;

  users[editRow] = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  editRow = null;

  saveUsers(users);

  renderTable(users, tableBody, editRow);
}

// DELETE USER

function deleteData(index: number): void {
  if (confirm("Delete record?")) {

    users.splice(index, 1);
    // Reset edit row if deleted row was editing
    if (editRow === index) {
    editRow = null;
    clearForm();
    }

    // Adjust edit row index after delete
    else if (editRow !== null && editRow > index) {
      editRow--;
    }
    
    saveUsers(users);

    renderTable(users, tableBody, editRow);
   
  }
}

// CLEAR FORM

function clearForm(): void {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  const radios = document.getElementsByName(
    "gender"
  ) as NodeListOf<HTMLInputElement>;

  radios.forEach((radio) => {
    radio.checked = false;
  });
}

// SEARCH

searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filteredUsers = filterUsers(users, value);

  renderTable(filteredUsers, tableBody, editRow);
});

// SORTING

function sortTable(colIndex: number, order: "asc" | "desc"): void {
  users = sortUsers(users, colIndex, order);

renderTable(users, tableBody, editRow);
}

// GLOBAL FUNCTIONS

(window as any).editData = editData;
(window as any).deleteData = deleteData;
(window as any).sortTable = sortTable;