import React, { Fragment } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";

// import { Modal } from "./Modal";

function Expenses() {
  const list = [
    {
      id: "12345",
      date: "12/31/2020",
      payee: " Some big long store name",
      amount: "53.12",
      type: "Card",
      category: "Groceries",
      memo: ""
    },
    {
      id: "24567",
      date: "2/5/2020",
      payee: "Trader Joe's",
      amount: "35.10",
      type: "Card",
      category: "Groceries",
      memo: ""
    },
    {
      id: "36958",
      date: "2/12/2020",
      payee: "Starbucks",
      amount: "10.00",
      type: "Cash",
      category: "Food & Beverage",
      memo: "reloaded card"
    },
    {
      id: "11234",
      date: "12/31/2020",
      payee: " Some big long store name",
      amount: "53.12",
      type: "Card",
      category: "Groceries",
      memo: ""
    },
    {
      id: "24577",
      date: "2/5/2020",
      payee: "Trader Joe's",
      amount: "35.10",
      type: "Card",
      category: "Groceries",
      memo: ""
    },
    {
      id: "36918",
      date: "2/12/2020",
      payee: "Starbucks",
      amount: "10.00",
      type: "Cash",
      category: "Food & Beverage",
      memo: "reloaded card"
    }
  ];

  const expenseList = list.map(expense => {
    return <ExpenseCard key={expense.id} data={expense} />;
  });

  return (
    <Fragment>
      <div id="main">
        <div className="list-header">
          <p className="medium bold text-golden">Expense List</p>
          <Button
            id="add-expense"
            className="btn btn-standard"
            btnName="Add Expense"
          />
        </div>
        <div id="expense-list">{expenseList.length ? expenseList : <h3>You haven't entered any expenses...</h3>}</div>
        <div className="py-1">
          {/* <button id="edit-expense" className="btn btn-standard">
            Edit
          </button> */}
        </div>
      </div>
      {/* <Modal title={"Add Expense"} /> */}
    </Fragment>
  );
}

export default Expenses;
