import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ResponsiveProvider from "./providers/ResponsiveProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResponsiveProvider>
      <App />
    </ResponsiveProvider>
  </React.StrictMode>
);
