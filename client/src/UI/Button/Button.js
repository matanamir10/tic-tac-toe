import React from "react";
import "./Button.scss";

export const Button = (props) => {
  const { className } = props;
  let buttonClasses = "custom__btn";
  if (className && className !== "") {
    buttonClasses = `custom__btn ${className}`;
  }
  return (
    <button {...props} className={buttonClasses}>
      {props.children}
    </button>
  );
};
