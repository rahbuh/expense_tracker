import React from "react";
import { ExpenseField } from "./ExpenseField";
import {formatDate} from "../../helpers/format"

export const ExpenseCard = props => {
  const { _id, date, payee, amount, type, category, memo } = props.data;

  return (
    <div id={_id} className="card">
      <div className="row row-primary">
        <ExpenseField
          className={"date"}
          title={"Date: "}
          data={formatDate(date)}
        />
        <ExpenseField className={"amount"} title={"Amount: "} data={amount} />
        <ExpenseField className={"payee"} title={"Payee: "} data={payee} />
      </div>
      <div className="row row-secondary">
        <ExpenseField className={"type"} title={"Type: "} data={type} />
        <ExpenseField
          className={"category"}
          title={"Category: "}
          data={category}
        />
        <ExpenseField className={"memo"} title={"Memo: "} data={memo} />
      </div>
      <div className="row row-icons">
        <i id="edit-expense" className="fas fa-edit"></i>
        <i id="delete-expense" className="far fa-trash-alt"></i>
      </div>
    </div>
  );
};
