import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HooksProvider } from "./hooks/useHooks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HooksProvider>
      <App />
    </HooksProvider>
  </React.StrictMode>
);
