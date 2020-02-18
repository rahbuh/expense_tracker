import React from "react";

export const ExpenseField = ({ className, title, data }) => {
  return (
    <div className={className}>
      <div className="expense-title">{title}</div>
      <div className="expense-data">{data}</div>
    </div>
  );
};
