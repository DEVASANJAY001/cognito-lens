import { createRoot } from "react-dom/client";
import Popup from "./Popup";
import "./popup.css";

const root = document.getElementById("popup-root");

if (root) {
  createRoot(root).render(<Popup />);
}
