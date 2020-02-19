import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";

import { list } from "../../helpers/mockExpenseData";

function Expenses() {
  const [userExpenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    setExpenses(list.map(expense => ({ ...expense })));
  };

  // const saveExpense = () => {
  // get input from modal fields
  // validate user
  // - if not valid - redirect to login page
  // - else
  // - -- post input to /user/expenses
  // - -- update state with expense
  // - -- close modal (set showModal to false)
  // }

  const expenseList = userExpenses.map(expense => {
    return <ExpenseCard key={expense.id} data={expense} />;
  });

  return (
    <Fragment>
      <div id="main" className={showModal ? "is-blurred" : ""}>
        <div className="list-header">
          <p className="medium bold text-golden">Expense List</p>
          <Button
            id="add-expense"
            className="btn btn-standard"
            btnName="Add Expense"
            onClick={() => setShowModal(true)}
          />
        </div>
        <div id="expense-list">
          {expenseList.length ? (
            expenseList
          ) : (
            <h3>You haven't entered any expenses...</h3>
          )}
        </div>
      </div>
      {showModal ? <Modal title={"Add Expense"} /> : null}
    </Fragment>
  );
}

export default Expenses;
