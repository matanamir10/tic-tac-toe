import React, { useState } from "react";

export const OponentContext = React.createContext();

export const OponentProvider = (props) => {
  const [isGameAvailable, setIsGameAvaliable] = useState(false);
  const [turn, setTurn] = useState(false);
  const [player, setPlayer] = useState(null);

  const setPlayerTurn = (myTurn) => setTurn(myTurn);

  const setGame = (state) => setIsGameAvaliable(state);

  const setPlayerType = (type) => {
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
