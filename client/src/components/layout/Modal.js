import React, { useState } from "react";
import { Input, Select } from "./InputFields";
import { Button } from "./Button";
import { postExpenseAPI } from "../../api/userExpense";

export const Modal = props => {
  // **** these will be updated via API call to users saved lists
  const methods = ["Cash", "Credit Card", "Debit Card", "Paypal", "Apple Pay"];
  const categories = [
    "Groceries",
    "Gas",
    "Dining Out",
    "Clothing",
    "Transportation",
    "Entertainment",
    "Recreation",
    "Personal Care",
    "Travel",
    "Misc"
  ];
  const token = props.token;
  // ****

  const [inputData, setInputData] = useState({ ...props.expenseData });
  const [errorMsg, setErrorMsg] = useState([]);

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveExpense = e => {
    e.preventDefault();
    if (props.type.modal === "new") {
      postExpenseAPI(inputData, token).then(response => {
        const { success, errors } = response;

        if (success) {
          // props.updateExpenseList(success);
          props.close();
        }
        if (errors) {
          setErrorMsg(errors);
        }
      });
    }

    if (props.type.modal === "edit") {
      console.log("Expense Updated");
      props.close();
    }
    // - if user not valid - redirect to login page
  };

  return (
    <div id="Modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{props.type.title}</p>
          <i
            className="close-modal far fa-times-circle"
            onClick={props.close}
          ></i>
        </div>
        <div className="modal-body">
          {errorMsg.length ? (
            <p className="modal-error">{errorMsg[0].msg}</p>
          ) : null}
          <form id="expense-form">
            <Input
              defaultValue={inputData.payee}
              type="text"
              title="Payee"
              name="payee"
              placeholder="who took your money?"
              onChange={handleChange}
            />
            <Input
              defaultValue={inputData.date}
              type="date"
              title="Date"
              name="date"
              onChange={handleChange}
            />
            <Input
              defaultValue={inputData.amount}
              type="number"
              title="Amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
              onChange={handleChange}
            />
            <Select
              defaultValue={inputData.method}
              title="Payment Method"
              name="method"
              options={[...methods]}
              onChange={handleChange}
            />
            <Select
              defaultValue={inputData.category}
              title="Category"
              name="category"
              options={[...categories]}
              onChange={handleChange}
            />
            <Input
              defaultValue={inputData.memo}
              type="text"
              title="Memo"
              name="memo"
              placeholder="anything to note?"
              onChange={handleChange}
            />
            <Button
              id="save-expense"
              className="btn btn-modal my"
              btnName={props.type.btnName}
              action={saveExpense}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
