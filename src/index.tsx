import React from "react";
import { createRoot } from "react-dom/client";
import Stage from "./components/Stage";
import "./style.css";

const App = () => {
  return <Stage />;
};
createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
