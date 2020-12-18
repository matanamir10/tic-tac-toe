import React, { useContext, useEffect, useState } from "react";
import "./Game.scss";
import { Board } from "../../components/Board/Board";
import { MatchDetails } from "../../components/MatchDetails/MatchDetails";
import { Square } from "../../models/Square";
import { OponentContext } from "../../context/Oponent";
import { winningOptions } from "../../constants/WinningOptions";
import { Player } from "../../constants/Player";
import socketConnection from "../../socket";

// Maybe use game configuraion page before
const initalSquares = [];
for (let i = 0; i < 9; i++) {
  initalSquares[i] = new Square(i, null, false);
}

let clickedINdex = null;

export const Game = () => {
  const [squares, setSquares] = useState(initalSquares);
  const { turn, setPlayerTurn, player, setPlayerType, setGame } = useContext(
    OponentContext
  );
  const socket = socketConnection.getSocket();

  const onSquareClicked = (index, playerType) => {
    console.log("onSquareClicked", playerType);
    clickedINdex = index;
    setSquares((prevSquares) =>
      prevSquares.map((square, currIndex) => {
        if (currIndex === index) {
          return {
            ...square,
            value: playerType,
            isChecked: true,
          };
        }
        return square;
      })
    );
  };

  const checkForWin = () => {
    console.log(squares);
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

  const checkDraw = () => {
    return squares.every((sq) => sq.value !== null);
  };

  useEffect(() => {
    console.log("turn in useeffect: ", turn);
    if (turn) {
      setPlayerTurn(false);
      socket.emit("move", clickedINdex);
    }

    // TODO: check win
    let winner = checkForWin();
    if (winner || checkDraw()) {
      if (winner) {
        console.log(`winner is: ${winner}`);
      } else {
        console.log("Great draw");
      }
      socket.emit("winner");
      setGame(false);
    }
  }, [squares]);

  useEffect(() => {
    console.log("setup listners");

    socket.on("player", (player) => {
      console.log("Player", player);
      console.log(turn);
      setPlayerType(player);
    });
    socket.on("act", () => {
      console.log("act");
      setPlayerTurn(true);
    });

    socket.on("updateBoard", (data) => {
      console.log(data);
      console.log("updateBoard");
      console.log(data.index, data.player);
      onSquareClicked(data.index, data.player);
    });
    socket.emit("ready");
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("player", player);
  return (
    <div className="game">
      <MatchDetails />
      <Board
        disabled={!turn}
        squares={squares}
        player={player}
        rows={3}
        columns={3}
        onSquareClicked={onSquareClicked}
      />
    </div>
  );
};
