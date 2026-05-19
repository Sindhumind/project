import { state } from "../app.state";
import { renderApp } from "./app";
import { filterUsers,sortUsers,} from "../app.logic";
import { saveUsers } from "../app.storage";
import { createElement } from "../utils/dom";
import type { User } from "../types";

export function Table(): HTMLDivElement {
  const wrapper = createElement("div", "card");

  // TITLE
  const title = createElement("h2");
  title.textContent = "Registered Users";
  wrapper.appendChild(title);

  // SEARCH INPUT

const searchInput = createElement(
  "input",
  "input-search"
) as HTMLInputElement;

searchInput.placeholder =
  "Search users";

searchInput.value =
  state.search;

// RESTORE SEARCH FOCUS
if (state.isSearching) {
  setTimeout(() => {
    searchInput.focus();

    searchInput.setSelectionRange(
      searchInput.value.length,
      searchInput.value.length
    );
  });
  state.isSearching = false;
}

// SEARCH EVENT

searchInput.addEventListener(
  "input",
  () => {
    state.search =
      searchInput.value;
    state.isSearching = true;
    renderApp();
  }
);

wrapper.appendChild(searchInput);

  // TABLE
  const table = createElement("table","table");

 // TABLE HEADER

const thead = createElement("thead");

const headerRow = createElement("tr");

const headers: (keyof User)[] = [
  "name",
  "email",
  "phone",
  "gender",
];

headers.forEach((field) => {
  const th = createElement("th");

  // HEADER CONTAINER
  const headerContent =
    createElement("div","table-header");

  // HEADER TEXT
  const text = createElement("span");
  text.textContent = field.toUpperCase();

  // SORT ICON
  const sortIcon = createElement("i");

  if (state.sortField === field) {
    sortIcon.className =
      state.sortOrder === "asc"
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort-down";
  } else {
    sortIcon.className ="fa-solid fa-sort";
  }
  sortIcon.classList.add("sort-icon");

  // SORT EVENT
  th.addEventListener(
    "click",
    () => {
      if (
        state.sortField === field
      ) {
        state.sortOrder =
          state.sortOrder ===
          "asc"
            ? "desc"
            : "asc";
      } else {
        state.sortField = field;
        state.sortOrder ="asc";
      }

      renderApp();
    }
  );

  // APPEND

  headerContent.append(
    text,
    sortIcon
  );
  th.appendChild( headerContent );
  headerRow.appendChild(th);
});

  // ACTION COLUMN
  const actionHeader = createElement("th");
  actionHeader.textContent = "ACTIONS";
  headerRow.appendChild( actionHeader );
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // TABLE BODY
  const tbody = createElement( "tbody" );
  let users = filterUsers(
    state.users,
    state.search
  );

  if (state.sortField) {
    users = sortUsers(
      users,
      state.sortField,
      state.sortOrder
    );
  }
  users.forEach((user) => {
    tbody.appendChild(
      createRow(user)
    );
  });
  table.appendChild(tbody);
  const tableContainer =
  createElement(
    "div",
    "table-container"
  );

 tableContainer.appendChild(table);
 wrapper.appendChild(tableContainer);
  return wrapper;
}

function createRow(
  user: User
): HTMLTableRowElement {
  const row = createElement("tr");
  if (state.form.editId === user.id) {
      row.classList.add("editing-row");
  }

  // NAME
  const name = createElement("td");
  name.textContent = user.name;

  // EMAIL
  const email = createElement("td");
  email.textContent = user.email;

  // PHONE
  const phone = createElement("td");
  phone.textContent = user.phone;

  // GENDER
  const gender = createElement("td");
  gender.textContent =
    user.gender;

  // ACTIONS
  const actions = createElement("td");

  // EDIT BUTTON
  const editBtn = createElement(
    "button",
    "btn"
  );
  editBtn.type = "button";
  editBtn.title = "Edit";

  const editIcon =
    createElement("i");
  editIcon.className =
    "fa-solid fa-pen";
  editBtn.appendChild(
    editIcon
  );

editBtn.addEventListener(
  "click",
  () => {
    state.form = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      editId: user.id,
    };

    renderApp();
  }
);

  // DELETE BUTTON

  const deleteBtn = createElement(
    "button",
    "btn btn-danger"
  );

  deleteBtn.type = "button";
  deleteBtn.title = "Delete";
  const deleteIcon = createElement("i");

  deleteIcon.className = "fa-solid fa-trash";

  deleteBtn.appendChild( deleteIcon );

  deleteBtn.addEventListener(
    "click",
    () => {
      const confirmed =
        confirm(
          "Delete this user?"
        );

      if (!confirmed) {
        return;
      }

      state.users =
        state.users.filter(
          (u) => u.id !== user.id
        );

      // RESET FORM IF EDITING USER DELETED
      if (
        state.form.editId ===
        user.id
      ) {
        state.form = {
          name: "",
          email: "",
          phone: "",
          gender: "",
          editId: null,
        };
      }

      saveUsers();
      renderApp();
    }
  );

  actions.append(
    editBtn,
    deleteBtn
  );

  row.append(
    name,
    email,
    phone,
    gender,
    actions
  );
  return row;
}