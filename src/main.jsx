import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/ambient.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import "lenis/dist/lenis.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
