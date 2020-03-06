import React, { Fragment, useState, useEffect, useContext } from "react";
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
import Session from "../../helpers/session";
import AuthContext from "../../context/auth";

const Expenses = () => {
  const { handleLogOut } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState();
  const [userExpenses, setExpenses] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [userPayType, setUserPayType] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [status, setStatus] = useState();
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
    const token = Session.checkSession();

    async function loadUserData() {
      setIsLoading(true);
      setStatus("");
      try {
        const expenses = await getAllExpensesAPI(token);
        const categories = await getUserCategoriesAPI(token);
        const paytype = await getUserPayTypesAPI(token);

        if (expenses.success) {
          setExpenses(expenses.success.map(expense => ({ ...expense })));
          setIsLoading(false);
        }
        if (categories.success) {
          setUserCategories([...categories.success]);
        }
        if (paytype.success) {
          setUserPayType([...paytype.success]);
        }
        if (expenses.status) {
          setIsLoading(false);
          setStatus(expenses.status);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    loadUserData();
  }, []);

  useEffect(() => {
    if (status === 401 || status === 403) {
      handleLogOut();
    }
  }, [status, handleLogOut]);

  const handleErrors = ({ errors, status }) => {
    if (errors) {
      console.error(errors);
    }
    if (status && (status === 401 || status === 403)) {
      setStatus(status);
    }
  };

  const updateExpenses = async () => {
    setIsLoading(true);
    const token = Session.checkSession();
    const expenses = await getAllExpensesAPI(token);
    if (expenses.success) {
      setExpenses(expenses.success.map(expense => ({ ...expense })));
      Session.setSession(expenses.newtoken);
      setIsLoading(false);
    } else {
      handleErrors(expenses);
    }
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
    const token = Session.checkSession();
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
    const token = Session.checkSession();
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
            <p className="medium bold text-golden">My Expenses</p>
            <Button
              id="add-expense"
              className="btn btn-standard"
              btnName="Add Expense"
              action={e => addNewExpense()}
            />
          </div>
          <div id="expense-list">
            {isLoading ? (
              <h3>Loading...</h3>
            ) : expenseList.length ? (
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
