import React from "react";
import { createRoot } from "react-dom/client";
import Stage from "./components/Stage";
import "./style.css";

const App = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <Stage />
    </div>
  );
};
createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
