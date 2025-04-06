import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./locales/i18next"; // Ensure this import is here
import { I18nextProvider } from "react-i18next";
import i18next from "./locales/i18next"; // Import your i18next configuration

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
