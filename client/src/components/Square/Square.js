import React from "react";
import "./Square.scss";

export const Square = ({ square, onSquareClicked, player }) => {
  let squareClasses = "square";
  if (square.isChecked) {
    squareClasses = `square square--disabled`;
  }
  return (
    <div
      className={squareClasses}
      onClick={onSquareClicked.bind(null, square.id, player)}
    >
      <span className="square__text">
        {square.isChecked ? square.value : null}
      </span>
    </div>
  );
};
