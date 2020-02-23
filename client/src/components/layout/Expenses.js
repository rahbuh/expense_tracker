import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";

import { getExpensesAPI } from "../../api/userExpense";
import {token} from "../../helpers/token"

function Expenses() {
  const [userExpenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    getExpensesAPI(token).then(response => {
      const { success, error } = response;

      if (success) {
        setExpenses(success.map(expense => ({ ...expense })));
      }
      if (error) {
        // should cause redirect to login
        console.log("Error returned: ", error);
      }
    });
  };

  const updateExpenseList = newExpense => {
    setExpenses(prevState => [...prevState, newExpense]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const expenseList = userExpenses.map(expense => {
    return <ExpenseCard key={expense._id} data={expense} />;
  });

  return (
    <Fragment>
      <div id="main" className={showModal ? "is-blurred" : ""}>
        <div className="content">
          <div className="list-header">
            <p className="medium bold text-golden">Expense List</p>
            <Button
              id="add-expense"
              className="btn btn-standard"
              btnName="Add Expense"
              action={() => setShowModal(true)}
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
      </div>
      {showModal ? (
        <Modal
          title={"Add Expense"}
          updateExpenseList={updateExpenseList}
          close={closeModal}
          token={token}
        />
      ) : null}
    </Fragment>
  );
}

export default Expenses;
