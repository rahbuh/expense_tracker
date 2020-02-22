import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";

import { getAllExpenses } from "../../api/userExpense";

function Expenses() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0ZTFiZGE0ZDFiYWUzY2M0NDU5NzE0In0sImlhdCI6MTU4MjQwNjc5NiwiZXhwIjoxNTgyNDEwMzk2fQ.OAkqu1catbRFiHDqL0hJvbcoyiNaX8D87sT8nImLdQQ";

  const [userExpenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    getAllExpenses(token).then(response => {
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

  const displayAddedExpense = newExpense => {
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
          displayAddedExpense={displayAddedExpense}
          close={closeModal}
          token={token}
        />
      ) : null}
    </Fragment>
  );
}

export default Expenses;
