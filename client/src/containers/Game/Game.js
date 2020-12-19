import React, { useContext, useEffect, useState } from "react";
import "./Game.scss";
import { toast } from "react-toastify";
import { Board } from "../../components/Board/Board";
import { MatchDetails } from "../../components/MatchDetails/MatchDetails";
import { Square } from "../../models/Square";
import { OponentContext } from "../../context/Oponent";
import { winningOptions } from "../../constants/WinningOptions";
import socketConnection from "../../socket";
import { withWindowReload } from "../../hoc/withWindowReload";

const initalSquares = [];
for (let i = 0; i < 9; i++) {
  initalSquares[i] = new Square(i, null, false);
}

let clickedIndex = null;

const Game = () => {
  const [squares, setSquares] = useState(initalSquares);
  const { turn, setPlayerTurn, player, setPlayerType, setGame } = useContext(
    OponentContext
  );

  const socket = socketConnection.getSocket();

  const onSquareClicked = (index, playerType) => {
    clickedIndex = index;
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

  const notifyEndOfGame = () => {
    setPlayerTurn(false);
  };

  const closeGame = () => {
    socket.emit("endGame");
    setGame(false);
  };

  useEffect(() => {
    console.log("turn", turn);
    console.log("squares", squares);

    if (turn) {
      setPlayerTurn(false);
      socket.emit("move", clickedIndex);
    }

    let winner = checkForWin();
    if (winner || checkDraw()) {
      if (winner) {
        notifyEndOfGame();
        toast.info(`The winner is: ${winner}`, {
          autoClose: 3000,
          onClose: closeGame,
          pauseOnHover: false,
        });
      } else {
        notifyEndOfGame();
        toast.info("Great draw", {
          autoClose: 3000,
          onClose: closeGame,
          pauseOnHover: false,
        });
      }
    }
  }, [squares]);

  useEffect(() => {
    socket.on("player", (player) => {
      setPlayerType(player);
    });

    socket.on("act", () => {
      setPlayerTurn(true);
    });

    socket.on("updateBoard", (data) => {
      onSquareClicked(data.index, data.player);
    });

    socket.on("leave", () => {
      console.log("leaving..");
      toast.info("Oponent leaved", { autoClose: 3000, pauseOnHover: false });
      closeGame();
    });

    socket.emit("ready");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="game">
      <MatchDetails />
      <Board
        disabled={!turn}
        squares={squares}
        player={player}
        onSquareClicked={onSquareClicked}
      />
    </div>
  );
};

export default withWindowReload(Game);
