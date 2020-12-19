import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { App } from "./containers/App/App";
import { OponentProvider } from "./context/Oponent";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <OponentProvider>
        <App />
      </OponentProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
