import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import VNZRU_MarkdownEditor from ".";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VNZRU_MarkdownEditor />
  </StrictMode>
);
