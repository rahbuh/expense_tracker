import React from "react";

export const Button = props => {

 console.log(props)


  return (
    <button id={props.id} className={props.className} onClick={props.onClick}>
      {props.btnName} 
    </button>
  );
};
