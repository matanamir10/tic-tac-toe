import React, { useContext, useState } from "react";
import "./Setup.scss";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import socket from "../../socket";
import { OponentContext } from "../../context/Oponent";
import { Button } from "../../UI/Button/Button";

export const Setup = () => {
  const [loading, setLoading] = useState(false);
  const { setGame } = useContext(OponentContext);

  const startConnection = () => {
    try {
      setLoading(true);
      socket.connect();
      const connection = socket.getSocket();
      connection.on("connect", () => {
        console.log("connected");
        connection.on("game", (data) => {
          setLoading(false);
          setGame(true);
        });
      });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000, pauseOnHover: false });
    }
  };

  return (
    <div className="setup">
      <Button className="setup__cta" onClick={startConnection}>
        Start Game
      </Button>
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
