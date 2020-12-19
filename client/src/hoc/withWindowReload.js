import React, { useEffect } from "react";

export const withWindowReload = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      window.addEventListener("beforeunload", (e) => {
        console.log("Going to refresh");
        e.preventDefault();
      });
    }, []);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };
};
