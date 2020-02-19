import React from "react";

export const Button = props => {
  return (
    <button id={props.id} className={props.className} onClick={props.onClick}>
      {props.btnName}
    </button>
  );
};
