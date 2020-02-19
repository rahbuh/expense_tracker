import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";

import { list } from "../../helpers/mockExpenseData";

// import { Modal } from "./Modal";

function Expenses() {
  const [userExpenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses()
  }, []);

  const getExpenses = () => {
    setExpenses(list.map(expense => ({ ...expense })));
  };

  const addExpense = () => {
    console.log("button clicked");
  };

  const expenseList = userExpenses.map(expense => {
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
            onClick={addExpense}
          />
        </div>
        <div id="expense-list">
          {expenseList.length ? (
            expenseList
          ) : (
            <h3>You haven't entered any expenses...</h3>
          )}
        </div>
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
