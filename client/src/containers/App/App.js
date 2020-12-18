import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { OponentContext } from "../../context/Oponent";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { Game } from "../Game/Game";
import { Setup } from "../Setup/Setup";

export const App = () => {
  const { isGameAvailable } = useContext(OponentContext);

  useEffect(() => {
    if (isGameAvailable) {
      toast.success("Game is starting...", { autoClose: 3000 });
    }
  }, [isGameAvailable]);

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
          render={() => (
            <ErrorBoundary>
              <Game />
            </ErrorBoundary>
          )}
        />
      </Switch>
    );
  }

  return (
    <div className="container">
      {routes}
      <ToastContainer className="tic-tac-toe-toast" />
    </div>
  );
};
