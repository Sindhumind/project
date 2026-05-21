import "./style.css";
import { storage } from "./app.storage";
import { renderApp } from "./components/app";

document.addEventListener( "DOMContentLoaded", (): void => { storage.loadUsers(); renderApp() } );