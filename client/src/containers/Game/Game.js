import React, { useContext, useEffect, useState } from "react";
import "./Game.scss";
import { Board } from "../../components/Board/Board";
import { MatchDetails } from "../../components/MatchDetails/MatchDetails";
import { Square } from "../../models/Square";
import { OponentContext } from "../../context/Oponent";
import { winningOptions } from "../../constants/WinningOptions";

// Maybe use game configuraion page before
const initalSquares = [];
for (let i = 0; i < 9; i++) {
  initalSquares[i] = new Square(i, null, false);
}

export const Game = () => {
  const [squares, setSquares] = useState(initalSquares);
  const { turn, setPlayerTurn } = useContext(OponentContext);

  const onSquareClicked = (index) => {
    setSquares((prevSquares) =>
      prevSquares.map((square, currIndex) => {
        if (currIndex === index) {
          return { ...square, value: turn, isChecked: true };
        }
        return square;
      })
    );
  };

  const checkForWin = () => {
    let isWinner = null;
    for (const option of winningOptions) {
      const [first, second, third] = option;
      isWinner =
        squares[first].value &&
        squares[first].value === squares[second].value &&
        squares[first].value === squares[third].value
          ? squares[first].value
          : null;
      if (isWinner) {
        break;
      }
    }
    return isWinner;
  };

  useEffect(() => {
    let winner = checkForWin();
    if (winner) {
      alert(`winner is: ${winner}`);
    }
    setPlayerTurn();
    // TODO: check win
  }, [squares]);

  return (
    <div className="game">
      <MatchDetails />
      <Board
        squares={squares}
        rows={3}
        columns={3}
        onSquareClicked={onSquareClicked}
      />
    </div>
  );
};
