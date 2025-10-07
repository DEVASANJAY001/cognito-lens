import { createRoot } from "react-dom/client";
import Sidebar from "./Sidebar";
import "./sidebar.css";

const root = document.getElementById("sidebar-root");

if (root) {
  createRoot(root).render(<Sidebar />);
}
