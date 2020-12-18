import React, { useState } from "react";
import { Player } from "../constants/Player";

export const OponentContext = React.createContext();

export const OponentProvider = (props) => {
  const [isGameAvailable, setIsGameAvaliable] = useState(false);
  const [turn, setTurn] = useState(false);
  const [player, setPlayer] = useState(null);

  const setPlayerTurn = (myTurn) => setTurn(myTurn);

  const setGame = (state) => setIsGameAvaliable(state);

  const setPlayerType = (type) => {
    console.log("Player type is:", type);
    setPlayer(type);
  };

  return (
    <OponentContext.Provider
      value={{
        turn,
        setPlayerTurn,
        player,
        setPlayerType,
        isGameAvailable,
        setGame,
      }}
    >
      {props.children}
    </OponentContext.Provider>
  );
};
