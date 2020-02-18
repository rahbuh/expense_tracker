import React from "react";

export const Alert = props => {
  return <div className={props.className}>{props.message}</div>;
};
