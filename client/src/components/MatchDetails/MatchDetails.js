import React, { useContext } from "react";
import "./MatchDetails.scss";
import { OponentContext } from "../../context/Oponent";
import { Player } from "../../constants/Player";

export const MatchDetails = () => {
  const { player, turn } = useContext(OponentContext);

  let currentPlayer = turn
    ? "You are"
    : player === Player.X
    ? `Player ${Player.O} is`
    : `Player ${Player.X} is`;
  return (
    <div className="match-details">
      <p className="match-details__text">{currentPlayer} playing</p>
    </div>
  );
};
