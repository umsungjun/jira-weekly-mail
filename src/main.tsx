import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (import.meta.env.DEV) {
  const { Agentation } = await import("agentation");
  const root = document.createElement("div");
  document.body.appendChild(root);
  createRoot(root).render(<Agentation />);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
