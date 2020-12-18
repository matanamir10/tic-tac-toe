import React, { useContext } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { OponentContext } from "../../context/Oponent";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { Game } from "../Game/Game";
import { Setup } from "../Setup/Setup";

export const App = () => {
  const { isGameAvailable } = useContext(OponentContext);
  console.log(isGameAvailable);

  let routes = (
    <Switch>
      <Route path="/" component={Setup} />
    </Switch>
  );
  if (isGameAvailable) {
    routes = (
      <Switch>
        <Route
          path="/"
          render={(props) => {
            return (
              <ErrorBoundary>
                <Game {...props} />
              </ErrorBoundary>
            );
          }}
        />
      </Switch>
    );
  }

  return (
    <div className="container">
      {routes}
      <ToastContainer />
    </div>
  );
};
