 import type { User } from "../types/user";
import { isValidEmail } from "../utils/validation";
import { getGender } from "../utils/gender";
import { isDuplicate } from "../utils/duplicate";
import { renderTable } from "./renderTable";

 export function Form() {
  return `
        <div id = "reg-form-main">
            <form id="registration-form">
                <h2>Registration Form</h2>

                <label>Full Name</label>
                <input type="text" id="full-name" class = "input-fields">
                
                <label>Email</label>
                <input type="text" id="email-address" class = "input-fields">
              
                <label>Phone</label>
                <input type="phone" id="phone-number" pattern="[0-9+]+" required class = "input-fields">
                
                <div class="form-group">
                    <label>Gender:</label>
                    <label>
                        <input type="radio" name="gender" value="Male"> Male
                    </label>

                    <label>
                        <input type="radio" name="gender" value="Female"> Female
                    </label>

                    <label>
                        <input type="radio" name="gender" value="Other"> Other
                    </label>
                </div>

                <button type="submit" id ="submit-button">
                Submit
                </button>
            </form>
        </div>`;
 }
 // FORM SUBMIT
export function initializeForm(
  form: HTMLFormElement,
  nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  phoneInput: HTMLInputElement,
  users: User[],
  getEditRow: () => number | null,
  addUser: () => void,
  updateUser: () => void,
  clearForm: () => void
): void {
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

  if (getEditRow() === null && isDuplicate(users, emailInput.value)) {
    alert("Email already exists");
    return;
  }

  if (getEditRow() === null) {
    addUser();
  } else {
    updateUser();
  }

  clearForm();
});
}

// CLEAR FORM

export function clearForm(  
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    phoneInput: HTMLInputElement): void {
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

// EDIT USER

export function editData(
  index: number,
  users: User[],
  setEditRow: (index: number) => void,
  nameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  phoneInput: HTMLInputElement,
  tableBody: HTMLTableSectionElement,
  getEditRow: () => number | null
): void {
  const user = users[index];

  setEditRow(index);

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
  renderTable(users, users, tableBody, getEditRow());
}
