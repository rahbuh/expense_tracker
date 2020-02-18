import React from "react";

export const Button = props => {
  return (
    <button id={props.id} className={props.className}>
      {props.btnName}
    </button>
  );
};
