import React, { useState } from "react";
import { Player } from "../constants/Player";

export const OponentContext = React.createContext();

export const OponentProvider = (props) => {
  const [isGameAvailable, setIsGameAvaliable] = useState(false);
  const [turn, setTurn] = useState(Player.X);

  const setPlayerTurn = () =>
    setTurn((prevTurn) => (prevTurn === Player.X ? Player.O : Player.X));

  const setGame = (state) => setIsGameAvaliable(state);

  return (
    <OponentContext.Provider
      value={{ turn, setPlayerTurn, isGameAvailable, setGame }}
    >
      {props.children}
    </OponentContext.Provider>
  );
};
