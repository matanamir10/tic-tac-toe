import React, { useEffect } from "react";

export const withWindowReload = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      window.addEventListener("beforeunload", (event) => {
        event.returnValue = `Are you sure you want to leave?`;
      });
    }, []);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };
};
