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

let editRow: HTMLTableRowElement | null = null;
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

    let gender = getGender();
    if (gender === "") {
        alert("Select gender");
        return;
    }

    if (editRow == null && isDuplicate(emailInput.value)) {
        alert("Email exists");
        return;
    }

    if (editRow == null) {
        addRow();
    } else {
        updateRow();
    }

    saveData();
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
function isDuplicate(email:string):boolean {
    let rows = tableBody.rows;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[1].innerText == email) {
            return true;
        }
    }
    return false;
}

// ADD ROW
function addRow() {
    let row = tableBody.insertRow();
    row.innerHTML =
        "<td>" + nameInput.value + "</td>" +
        "<td>" + emailInput.value + "</td>" +
        "<td>" + phoneInput.value + "</td>" +
        "<td>" + getGender() + "</td>" +
        "<td>" +
        "<button class='action-button edit-button' onclick='editData(this)' title='Edit'>" +
                "<i class='fa-solid fa-pen'></i>" +
            "</button>" +
            "<button class='action-button delete-button' onclick='deleteData(this)' title='Delete'>" +
                "<i class='fa-solid fa-trash'></i>" +
            "</button>" +
        "</td>";
}

// EDIT
function editData(btn: HTMLButtonElement): void {
  //To remove highlighting
   if (editRow) {
    editRow.classList.remove("editing-row");
  }
    const row = btn.closest("tr") as HTMLTableRowElement;
    editRow = row;
   
    //To add Class to edit row
    editRow.classList.add("editing-row");
    nameInput.value = row.cells[0].innerText;
    emailInput.value = row.cells[1].innerText;
    phoneInput.value = row.cells[2].innerText;

    let gender = row.cells[3].innerText;
    const radios = document.getElementsByName("gender") as NodeListOf<HTMLInputElement>;

    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = (radios[i].value === gender);
    }
}

// UPDATE
function updateRow():void {
  if (!editRow) return;
    editRow.cells[0].innerText = nameInput.value;
    editRow.cells[1].innerText = emailInput.value;
    editRow.cells[2].innerText = phoneInput.value;
    editRow.cells[3].innerText = getGender();

    //To remove highlighting
   if (editRow) {
    editRow.classList.remove("editing-row");
  }
    editRow = null;
   
    
}

// DELETE
function deleteData(btn:HTMLButtonElement):void {
    const row = btn.closest("tr") as HTMLTableRowElement;

    if (confirm("Delete record?")) {
        row.remove();
        saveData();
    }
}

// CLEAR
function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    const radios = document.getElementsByName("gender") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}


// LOCAL STORAGE

function saveData() {
  const rows = tableBody.rows;
  const data: User[] = [];

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;

    const rowData = {
      name: cells[0].innerText,
      email: cells[1].innerText,
      phone: cells[2].innerText,
      gender: cells[3].innerText
    };

    data.push(rowData);
  }

  localStorage.setItem("users", JSON.stringify(data));
}

function loadData() {
  const data: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  tableBody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const row = `
      <tr>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].gender}</td>
        <td>
          <button class="action-button edit-button" onclick="editData(this)" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="action-button delete-button" onclick="deleteData(this)" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  }
}

//SEARCH 

searchInput.addEventListener("input", () => {

  // Get input value
  const value = searchInput.value.toLowerCase();

  // Get all rows
  const rows = tableBody.rows;

  // Loop through rows
  for (let i = 0; i < rows.length; i++) {

    const rowText = rows[i].innerText.toLowerCase();

    // Check match
    if (rowText.includes(value)) {
      rows[i].style.display = "";      // show
    } else {
      rows[i].style.display = "none";  // hide
    }
  }

});


// SORTING

function sortTable(colIndex: number, order: "asc" | "desc"): void {
    let rows = tableBody.rows;
    let switching = true;

    while (switching) {
        switching = false;

        for (let i = 0; i < rows.length - 1; i++) {
            let x = rows[i].cells[colIndex].innerText.toLowerCase();
            let y = rows[i + 1].cells[colIndex].innerText.toLowerCase();

            let shouldSwitch = false;

            if (order === "asc") {
                if (x > y) shouldSwitch = true;
            } else {
                if (x < y) shouldSwitch = true;
            }

            if (shouldSwitch) {
                rows[i].parentElement?.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            }
        }
    }
}
//To make functions global
(window as any).editData = editData;
(window as any).deleteData = deleteData;
(window as any).sortTable = sortTable;