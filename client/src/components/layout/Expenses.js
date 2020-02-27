import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";

import { getAllExpensesAPI, deleteExpenseAPI } from "../../api/userExpense";
import { token } from "../../helpers/token";

function Expenses() {
  const [userExpenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    getAllExpensesAPI(token).then(response => {
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

  const addNewExpense = () => {
    setExpenseData(prevState => {
      const update = { ...prevState };
      for (let key in update) {
        update[key] = "";
      }
      return { ...prevState, ...update };
    });
    setModalType({ title: "Add Expense", btnName: "Save", modal: "new" });
    setShowModal(true);
  };

  // const getExpense = (id) => {
  //   console.log(id);
  // }

  const editExpense = id => {
    // getExpense...
    const expenseToUpdate = {
      payee: "Starbucks",
      date: "2020-02-18",
      amount: "2.55",
      method: "Cash",
      category: "Misc",
      memo: "this is cool"
    };

    setExpenseData(prevState => ({ ...prevState, ...expenseToUpdate }));
    setModalType({ title: "Edit Expense", btnName: "Update", modal: "edit" });
    setShowModal(true);
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

  // const updateExpenseList = newExpense => {
  //   setExpenses(prevState => [...prevState, newExpense]);
  // };

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
              action={e => addNewExpense()}
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
          expenseData={expenseData}
          close={closeModal}
          token={token}
        />
      ) : null}
    </Fragment>
  );
}

export default Expenses;
