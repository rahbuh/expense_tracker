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

  const getExpenses = async () => {
    const expenses = await getAllExpensesAPI(token);
    if (expenses.success) {
      setExpenses(expenses.success.map(expense => ({ ...expense })));
    }
    // IF ERROR, REDIRECT TO LOGIN PAGE
  };

  const getCategories = async () => {
    const categories = await getUserCategoriesAPI(token);
    if (categories.success) {
      setUserCategories([...categories.success]);
    }
    // IF ERROR, REDIRECT TO LOGIN PAGE
  };

  const getPayTypes = async () => {
    const paytype = await getUserPayTypesAPI(token);
    if (paytype.success) {
      setUserPayType([...paytype.success]);
    }
    // IF ERROR, REDIRECT TO LOGIN PAGE
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

  const editExpense = async id => {
    const response = await getSingleExpenseAPI(id, token);
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
    // VALIDATION ERROR, REDIRECT TO LOGIN PAGE
  };

  const deleteExpense = async id => {
    const deletedExpense = await deleteExpenseAPI(id, token);
    if (deletedExpense.success) {
      getExpenses();
    }
    // VALIDATION ERROR, REDIRECT TO LOGIN PAGE
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
          token={token}
          type={modalType}
          expenseData={expenseData}
          categories={userCategories}
          paytype={userPayType}
          close={closeModal}
          getExpenses={getExpenses}
        />
      ) : null}
    </Fragment>
  );
};

export default Expenses;
