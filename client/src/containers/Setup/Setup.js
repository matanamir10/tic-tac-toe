import React, { useContext, useState } from "react";
import "./Setup.scss";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import socket from "../../socket";
import { OponentContext } from "../../context/Oponent";

export const Setup = () => {
  const [loading, setLoading] = useState(false);
  const { setGame } = useContext(OponentContext);

  const startConnection = () => {
    try {
      setLoading(true);
      socket.connect();
      const connection = socket.getSocket();
      console.log(connection);
      connection.on("connect", () => {
        console.log("connected");
        connection.on("game", (data) => {
          setLoading(false);
          console.log(data);
          setGame(true);
        });
      });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  };

  console.log("render set up");
  return (
    <div className="setup">
      <button className="setup__cta" onClick={startConnection}>
        Start Game
      </button>
      {loading ? (
        <ReactLoading
          className="setup__loading"
          type="spin"
          color="#c69963"
          height={50}
          width={50}
        />
      ) : null}
    </div>
  );
};
