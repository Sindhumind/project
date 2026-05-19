import { state } from "../app.state";
import { renderApp } from "./app";
import { saveUsers } from "../app.storage";
import { validateEmail, isDuplicate } from "../app.logic";
import { createElement } from "../utils/dom";

export function Form(): HTMLDivElement {
  const wrapper = createElement("div", "card");
  const form = createElement("form");

  // TITLE
  const title = createElement("h2");
  title.textContent =
    state.form.editId === null
      ? "Add User"
      : "Update User";

  // NAME INPUT
  const nameInput = createElement( "input", "input");
  nameInput.placeholder = "Full Name";
  nameInput.value = state.form.name;

  // EMAIL INPUT
  const emailInput = createElement("input","input");
  emailInput.placeholder = "Email";
  emailInput.value = state.form.email;

  // PHONE INPUT
  const phoneInput = createElement("input","input" );
  phoneInput.placeholder = "Phone";
  phoneInput.value = state.form.phone;

  // GENDER SECTION
  const genderWrapper = createElement("div", "radio-group");
  const genderTitle = createElement("p");
  genderTitle.textContent = "Gender";
  const genders = [
    "Male",
    "Female",
    "Other",
  ];

  genders.forEach((gender) => {
    const label = createElement("label","radio-label");
    const radio = createElement("input") as HTMLInputElement;
    radio.type = "radio";
    radio.name = "gender";
    radio.value = gender;
    radio.checked = state.form.gender === gender;
    radio.addEventListener(
      "change",
      () => { state.form.gender = gender;}
    );
    label.append(radio, gender);
    genderWrapper.appendChild(label);
  });

  // SUBMIT BUTTON
  const submitButton = createElement("button","btn");
  submitButton.type = "submit";
  submitButton.textContent =
    state.form.editId === null
      ? "Submit"
      : "Update";

  // APPEND FORM ELEMENTS
  form.append(
    title,
    nameInput,
    emailInput,
    phoneInput,
    genderTitle,
    genderWrapper,
    submitButton
  );

  // SUBMIT EVENT
  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const gender = state.form.gender;

      // VALIDATION
      if (
        !name ||
        !email ||
        !phone
      ) {
        alert("Fill all fields");
        return;
      }

      if (!gender) {
        alert("Select gender");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid email");
        return;
      }

      if (
        isDuplicate( state.users, email, state.form.editId )
      ) {
        alert("Duplicate email");
        return;
      }

      // ADD USER
      if (
        state.form.editId === null
      ) {
        state.users.push({
          id: Date.now(),
          name,
          email,
          phone,
          gender,
        });
      }

      // UPDATE USER
      else {
        const user =
          state.users.find(
            (u) =>
              u.id ===
              state.form.editId
          );

        if (user) {
          user.name = name;
          user.email = email;
          user.phone = phone;
          user.gender = gender;
        }
      }

      // RESET FORM STATE
      state.form = {
        name: "",
        email: "",
        phone: "",
        gender: "",
        editId: null,
      };

      saveUsers();
      renderApp();
    }
  );

  wrapper.appendChild(form);
  return wrapper;
}