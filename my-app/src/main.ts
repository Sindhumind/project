import { Form } from "./components/form";
import { initializeForm } from "./components/form";
import { clearForm } from "./components/form";
import { editData } from "./components/form";
import { Table } from "./components/table";
import { deleteData } from "./components/table";
import { addUser } from "./components/table";
import { updateUser } from "./components/table";

import { loadUsers } from "./services/storage";
import { renderTable } from "./components/renderTable";

import { initializeSort } from "./utils/sort";
import { initializeSearch } from "./utils/search";

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
 renderTable(users,users,tableBody,editRow);
 initializeSort(users,tableBody,editRow);
 initializeSearch(searchInput,users,tableBody,editRow);
 initializeForm(
  form,
  nameInput,
  emailInput,
  phoneInput,
  users,
  () => editRow,

  () =>
    addUser(
      users,
      nameInput,
      emailInput,
      phoneInput,
      tableBody,
      () => editRow
    ),

  () =>
    updateUser(
      users,
      nameInput,
      emailInput,
      phoneInput,
      tableBody,
      () => editRow,
      (value) => {
        editRow = value;
      }
    ),

  () =>
    clearForm(
      nameInput,
      emailInput,
      phoneInput
    )
);


// GLOBAL FUNCTIONS

(window as any).editData = (index: number) => {

  editData(
    index,
    users,
    (value) => {
      editRow = value;
    },
    nameInput,
    emailInput,
    phoneInput,
    tableBody,
    () => editRow
  );
};
(window as any).deleteData = (index: number) => {
  deleteData(
    index,
    users,
    () => editRow,
    (value) => {
      editRow = value;
    },
    () => clearForm(
      nameInput,
      emailInput,
      phoneInput
    ),
    tableBody
  );
};