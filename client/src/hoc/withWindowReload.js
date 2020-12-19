import React from "react";
import { useUnload } from "../hooks/useUnload";

export const withWindowReload = (WrappedComponent) => {
  return (props) => {
    useUnload((e) => {
      e.preventDefault();
      e.returnValue = "Are you sure?";
    });

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };
};
