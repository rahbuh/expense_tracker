import React, { useRef } from "react";
import { ExpenseField } from "./ExpenseField";
import { formatDisplayDate, formatDisplayAmount } from "../../helpers/format";

export const ExpenseCard = props => {
  const { _id, date, payee, amount, method, category, memo } = props.data;
  const expenseCard = useRef();

  return (
    <div id={_id} className="card" ref={expenseCard}>
      <div className="row row-primary">
        <ExpenseField
          className={"date"}
          title={"Date:"}
          data={formatDisplayDate(date)}
        />
        <ExpenseField
          className={"amount"}
          title={"Amount:"}
          data={"$ " + formatDisplayAmount(amount)}
        />
        <ExpenseField className={"payee"} title={"Payee:"} data={payee} />
      </div>
      <div className="row row-secondary">
        <ExpenseField className={"type"} title={"Type:"} data={method} />
        <ExpenseField
          className={"category"}
          title={"Category:"}
          data={category}
        />
        <ExpenseField className={"memo"} title={"Memo:"} data={memo} />
      </div>
      <div className="row row-icons">
        <i
          id="edit-expense"
          className="fas fa-edit"
          onClick={e => props.editExpense(expenseCard.current.id)}
        ></i>
        <i
          id="delete-expense"
          className="far fa-trash-alt"
          onClick={e => props.deleteExpense(expenseCard.current.id)}
        ></i>
      </div>
    </div>
  );
};
