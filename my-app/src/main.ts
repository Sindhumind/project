import "./style.css";

import { loadUsers } from "./app.storage";
import { renderApp } from "./components/app";

document.addEventListener(
  "DOMContentLoaded",
  (): void => {
    loadUsers();

    renderApp();
  }
);