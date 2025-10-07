import { createRoot } from "react-dom/client";
import Options from "./Options";
import "./options.css";

const root = document.getElementById("options-root");

if (root) {
  createRoot(root).render(<Options />);
}
