import React, { useContext } from "react";
import "./Setup.scss";
import socket from "../../socket";
import { OponentContext } from "../../context/Oponent";

export const Setup = () => {
  const { setGame } = useContext(OponentContext);

  const startConnection = () => {
    try {
      socket.connect();
      const connection = socket.getSocket();
      console.log(connection);
      connection.on("connect", () => {
        console.log("connected");
        connection.on("game", (data) => {
          console.log(data);
          setGame(true);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("render set up");
  return (
    <div className="setup">
      <button onClick={startConnection}>start</button>
    </div>
  );
};
