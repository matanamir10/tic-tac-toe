import React from "react";
import "./Board.scss";
import { Square as SquareCmp } from "../Square/Square";
import { Square } from "../../models/Square";

export const Board = ({ player, squares, onSquareClicked, disabled }) => {
  let boardStyle = "board";
  if (disabled) {
    boardStyle = "board board--disabled";
  }
  return (
    <div className={boardStyle}>
      {squares.map((square) => (
        <SquareCmp
          key={square.id}
          player={player}
          square={square}
          onSquareClicked={onSquareClicked}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: function (props, propName, componentName) {
    let error = false;
    const squares = props[propName];
    if (!squares) {
      error = true;
    }

    if (!Array.isArray(squares)) {
      error = true;
    } else if (squares.length !== 9) {
      error = true;
    } else {
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i] instanceof Square) {
          error = true;
          break;
        }
      }
    }

    if (error) {
      return new Error(
        `Invalid prop ${propName} supplied to 
             ${componentName} Validation failed.`
      );
    }
  },
};
