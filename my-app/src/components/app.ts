import { Form } from "./form";
import { Table } from "./table";
import { createElement } from "../utils/dom";

export function renderApp(): void {
  const root =
    document.getElementById("app");

  if (!root) {
    throw new Error( "Root element not found");
  }

  // CLEAR OLD UI
  root.innerHTML = "";

  // HEADER
  const header = createElement(
    "header",
    "app-header"
  );

  const title = createElement("h1");

  title.textContent = "Registration System";
  header.appendChild(title);

  // APP CONTAINER
  const app = createElement( "div", "app");

  // CONTENT
  const content = createElement("div", "app-content");

  content.appendChild(Form());
  content.appendChild(Table());

  // APP STRUCTURE
  app.append(header, content );
  root.appendChild(app);

}