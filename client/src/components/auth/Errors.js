import React from "react";

function Errors(props) {
  return <div className="alert alert-danger">{props.error}</div>;
}

export default Errors;
