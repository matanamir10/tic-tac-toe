import React, { useEffect } from "react";
import "./App.scss";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { Game } from "../Game/Game";
import socket from "../../socket";

export const App = () => {
  useEffect(() => {
    socket.connect();
    socket.getSocket().on("connect", () => {
      console.log("connected");
    });
  });
  return (
    <div className="container">
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </div>
  );
};
