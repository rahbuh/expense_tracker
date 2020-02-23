import React, { useRef } from "react";
import { ExpenseField } from "./ExpenseField";
import { formatDate } from "../../helpers/format";
import { deleteExpenseAPI } from "../../api/userExpense";
import {token} from "../../helpers/token"

export const ExpenseCard = props => {
  const { _id, date, payee, amount, type, category, memo } = props.data;
  const expenseCard = useRef();

  const deleteExpense = () => {
    const id = expenseCard.current.id

    deleteExpenseAPI(token, id).then(response => {

      console.log(response)
      // const { success, errors } = response;
      // if (success) {
      //   console.log(success)
      // }
      // if (errors) {
      //   console.log(errors);
      // }
    });

  }

  const editExpense = () => {
    console.log(expenseCard.current.id)
  }

  return (
    <div id={_id} className="card" ref={expenseCard}>
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
        <i id="edit-expense" className="fas fa-edit" onClick={editExpense}></i>
        <i id="delete-expense" className="far fa-trash-alt" onClick={deleteExpense}></i>
      </div>
    </div>
  );
};
