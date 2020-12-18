import React, { useEffect } from "react";
import "./App.scss";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { Game } from "../Game/Game";
import socket from "../../socket";

export const App = () => {
  useEffect(() => {
    socket.connect();
    const connection = socket.getSocket();
    connection.on("connect", () => {
      connection.on("game", (data) => {
        console.log(data);
      });
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
