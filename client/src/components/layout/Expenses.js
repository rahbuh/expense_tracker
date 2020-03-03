import React, { Fragment, useState, useEffect } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { formatInputDate } from "../../helpers/format";
import { getAllExpensesAPI, getSingleExpenseAPI, deleteExpenseAPI } from "../../api/userExpense";
import { getUserCategoriesAPI, getUserPayTypesAPI } from "../../api/userLists";
import Session from "../../helpers/session";

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
    const token = Session.checkSession()
    
    async function loadUserData() {
      const expenses = await getAllExpensesAPI(token);
      const categories = await getUserCategoriesAPI(token);
      const paytype = await getUserPayTypesAPI(token);

      if (expenses.success) {
        setExpenses(expenses.success.map(expense => ({ ...expense })));
      } else {
        handleErrors(expenses);
      }
      if (categories.success) {
        setUserCategories([...categories.success]);
      } else {
        handleErrors(categories);
      }
      if (paytype.success) {
        setUserPayType([...paytype.success]);
      } else {
        handleErrors(paytype);
      }
    }

    loadUserData();
  }, []);

  const handleErrors = result => {
    if (result.errors) {
      // DISPLAY ERRORS ??
      console.log(result.errors);
    }
    if (result.status) {
      // VALIDATION ERROR, REDIRECT TO LOGIN PAGE
      console.log("Error Status: ", result.status);
    }
  };

  const updateExpenses = async () => {
    const token = Session.checkSession()
    const expenses = await getAllExpensesAPI(token);

    if (expenses.success) {
      setExpenses(expenses.success.map(expense => ({ ...expense })));
    } else {
      handleErrors(expenses);
    }
  };

  const addNewExpense = () => {
    // SET ALL FIELDS TO EMPTY
    setExpenseData(prevState => {
      const update = { ...prevState };
      for (let key in update) update[key] = "";
      return { ...prevState, ...update };
    });
    setModalType({ title: "Add Expense", btnName: "Save", modal: "new" });
    setShowModal(true);
  };

  const editExpense = async id => {
    const token = Session.checkSession()
    const response = await getSingleExpenseAPI(id, token);

    if (response.success) {
      setExpenseData(prevState => ({
        ...prevState,
        _id: response.success._id,
        payee: response.success.payee,
        date: formatInputDate(response.success.date),
        amount: parseFloat(response.success.amount),
        method: response.success.method,
        category: response.success.category,
        memo: response.success.memo
      }));

      setModalType({
        title: "Edit Expense",
        btnName: "Update",
        modal: "edit"
      });
      setShowModal(true);
    } else {
      handleErrors(response);
    }
  };

  const deleteExpense = async id => {
    const token = Session.checkSession()
    const deletedExpense = await deleteExpenseAPI(id, token);
    
    if (deletedExpense.success) {
      updateExpenses();
    } else {
      handleErrors(deletedExpense);
    }
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
          categories={userCategories}
          paytype={userPayType}
          updateExpenses={updateExpenses}
          close={closeModal}
        />
      ) : null}
    </Fragment>
  );
};

export default Expenses;
