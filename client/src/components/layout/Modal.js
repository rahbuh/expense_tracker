import React from "react";

export const Modal = props => {
  return (
    <div id="ExpenseModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{props.title}</p>
          <i className="close-modal far fa-times-circle"></i>
        </div>
        <div className="modal-body">Stuff goes here</div>
      </div>
    </div>
  );
};
