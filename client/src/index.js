import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { App } from "./containers/App/App";
import { OponentProvider } from "./context/Oponent";

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
