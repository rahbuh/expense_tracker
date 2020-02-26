import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";

import { getExpensesAPI, deleteExpenseAPI } from "../../api/userExpense";
import { token } from "../../helpers/token";

function Expenses() {
  const [userExpenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();

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

  // const getExpense = (id) => {
  //   console.log(id);
  // }

  const editExpense = e => {
    setShowModal(true);
    setModalType({title: "Edit Expense", btnName: "Update"})
  };

  const deleteExpense = id => {
    deleteExpenseAPI(token, id).then(response => {
      console.log(response);
      // const { success, errors } = response;
      // if (success) {
      //   console.log(success)
      // }
      // if (errors) {
      //   console.log(errors);
      // }
    });
  };

  const updateExpenseList = newExpense => {
    setExpenses(prevState => [...prevState, newExpense]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const expenseList = userExpenses.map(expense => {
    return (
      <ExpenseCard
        key={expense._id}
        data={expense}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    );
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
              action={e => {
                setShowModal(true);
                setModalType({title: "Add Expense", btnName: "Save"})
              }}
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
          type={modalType}
          // updateExpenseList={updateExpenseList}
          close={closeModal}
          token={token}
        />
      ) : null}
    </Fragment>
  );
}

export default Expenses;
