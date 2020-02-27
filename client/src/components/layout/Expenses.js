import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { formatInputDate } from "../../helpers/format";
import {
  getAllExpensesAPI,
  getSingleExpenseAPI,
  deleteExpenseAPI
} from "../../api/userExpense";
import { getUserCategoriesAPI, getUserPayTypesAPI } from "../../api/userLists";

import { token } from "../../helpers/token"; // WILL BE SET BY LOGIN

const Expenses = () => {
  const [userExpenses, setExpenses] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [userPayType, setUserPayType] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [expenseData, setExpenseData] = useState({
    _id: "",
    payee: "",
    date: "",
    amount: "",
    method: "",
    category: "",
    memo: ""
  });

  useEffect(() => {
    getExpenses();
    getCategories();
    getPayTypes();
  }, []);

  const getExpenses = () => {
    getAllExpensesAPI(token).then(response => {
      const { success, error } = response;
      if (success) {
        setExpenses(success.map(expense => ({ ...expense })));
      }
      if (error) {
        // IF ERROR, REDIRECT TO LOGIN PAGE
        console.log("Error returned: ", error);
      }
    });
  };

  const getCategories = () => {
    getUserCategoriesAPI(token).then(response => {
      const { success, error } = response;
      if (success) {
        setUserCategories([...success]);
      }
      if (error) {
        // IF ERROR, REDIRECT TO LOGIN PAGE
        console.log("Error returned: ", error);
      }
    });
  };

  const getPayTypes = () => {
    getUserPayTypesAPI(token).then(response => {
      const { success, error } = response;
      if (success) {
        setUserPayType([...success]);
      }
      if (error) {
        // IF ERROR, REDIRECT TO LOGIN PAGE
        console.log("Error returned: ", error);
      }
    });
  };

  const addNewExpense = () => {
    setExpenseData(prevState => {
      const update = { ...prevState };
      for (let key in update) update[key] = "";
      return { ...prevState, ...update };
    });
    setModalType({ title: "Add Expense", btnName: "Save", modal: "new" });
    setShowModal(true);
  };

  const editExpense = id => {
    getSingleExpenseAPI(id, token).then(response => {
      const expense = response.success;
      if (expense) {
        const update = {
          _id: expense._id,
          payee: expense.payee,
          date: formatInputDate(expense.date),
          amount: parseFloat(expense.amount),
          method: expense.method,
          category: expense.category,
          memo: expense.memo
        };

        setExpenseData(prevState => ({ ...prevState, ...update }));
        setModalType({
          title: "Edit Expense",
          btnName: "Update",
          modal: "edit"
        });
        setShowModal(true);
      }
    });
  };

  const deleteExpense = id => {
    deleteExpenseAPI(id, token).then(response => {
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

  const closeModal = () => {
    setShowModal(false);
  };

  const expenseList = userExpenses
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map(expense => {
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
          categories={userCategories}
          paytype={userPayType}
        />
      ) : null}
    </Fragment>
  );
};

export default Expenses;
