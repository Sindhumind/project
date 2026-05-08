import { Form } from "./components/form";
import { Table } from "./components/table";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <h1>Registration Page</h1>
  </header>

  <pre id="output"></pre>

  <div id="main-container">
    ${Form()}
    ${Table()}
  </div>
`;

// TYPES
type User = {
      name: string;
      email: string;
      phone: string;
      gender: string;
    };

// ELEMENTS
const form = document.getElementById("registration-form") as HTMLFormElement;
const nameInput = document.getElementById("full-name") as HTMLInputElement;
const emailInput = document.getElementById("email-address") as HTMLInputElement;
const phoneInput = document.getElementById("phone-number") as HTMLInputElement;
const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;
let users: User[] = [];
let editRow: number | null = null;
const searchInput = document.getElementById("search-input") as HTMLInputElement;

//to load data once page loaded
window.onload = function () {
    loadData();
};

// FORM SUBMIT
form?.addEventListener("submit", (e: SubmitEvent ) => {
    e.preventDefault();

    if (nameInput.value == "" || emailInput.value == "" || phoneInput.value == "") {
        alert("Fill all fields");
        return;
    }

    // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value)) {
    alert("Invalid email");
    return;
  }

    const gender = getGender();
    if (gender === "") {
        alert("Select gender");
        return;
    }

    if (editRow == null && isDuplicate(emailInput.value)) {
        alert("Email exists");
        return;
    }

    if (editRow === null) {
        addUser();
    } else {
        updateUser();
    }
    clearForm();
});

// GET GENDER
function getGender():string {
   const radios = document.getElementsByName("gender") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "";
}

// DUPLICATE CHECK
function isDuplicate(email: string): boolean {
  return users.some((user) => user.email === email);
}

// ADD ROW
function addUser(): void {
  const user: User = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  users.push(user);

  renderTable(users);
}

// EDIT
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
  renderTable(users);
}

// UPDATE
function updateUser(): void {
  if (editRow === null) return;

  users[editRow] = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    gender: getGender()
  };

  editRow = null;

  renderTable(users);
}

// DELETE
function deleteData(index: number): void {
  if (confirm("Delete record?")) {
    users.splice(index, 1);

    renderTable(users);
  }
}

// CLEAR
function clearForm():void {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    const radios = document.getElementsByName("gender") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}

// SAVE DATA
function saveData(): void {
  localStorage.setItem("users", JSON.stringify(users));
}

// LOCAL STORAGE
function loadData(): void {
  users = JSON.parse(localStorage.getItem("users") || "[]");

  renderTable(users);
}


function renderTable(data: User[]): void {

  tableBody.innerHTML = "";

  data.forEach((user, index) => {

    const isEditing = editRow === index;

    const row = `
      <tr class="${isEditing ? 'editing-row' : ''}">
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

  saveData();
}

//SEARCH 

searchInput.addEventListener("input", () => {

  // Get input value
  const value = searchInput.value.toLowerCase();

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value) ||
      user.gender.toLowerCase().includes(value)
    );
  });

  renderTable(filteredUsers);
});


// SORTING

function sortTable(colIndex: number, order: "asc" | "desc"): void {
    const fields: (keyof User)[] = [
    "name",
    "email",
    "phone",
    "gender"
  ];

      const field = fields[colIndex];

  users.sort((a, b) => {

    const x = a[field].toLowerCase();
    const y = b[field].toLowerCase();

    if (order === "asc") {
      return x.localeCompare(y);
    }

    return y.localeCompare(x);
  });

  renderTable(users);
}


//To make functions global
(window as any).editData = editData;
(window as any).deleteData = deleteData;
(window as any).sortTable = sortTable;