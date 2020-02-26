import React from "react";

export const Button = props => {
  return (
    <button id={props.id} className={props.className} onClick={(e) => props.action(e, props.id)}>
      {props.btnName}
    </button>
  );
};
