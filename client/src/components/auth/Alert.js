import React from "react";

const Alert = (props) => {
  return <div className={props.className}>{props.message}</div>;
};

export default Alert;
