import React, { useState } from "react";
import { Input, Select } from "./InputFields";
import { Button } from "./Button";
import { postExpenseAPI } from "../../api/userExpense";

export const Modal = props => {
  // **** these will be updated via API call to users saved lists
  const methods = ["Cash", "Credit Card", "Debit Card", "Paypal", "Apple Pay"];
  const categories = ["Groceries", "Gas", "Dining Out", "Clothes", "Misc"];
  const token = props.token;
  // ****

  const [inputData, setInputData] = useState({
    payee: "",
    date: "",
    amount: "",
    method: "",
    category: "",
    memo: ""
  });
  const [errorMsg, setErrorMsg] = useState([]);

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveExpense = e => {
    e.preventDefault();
    postExpenseAPI(inputData, token).then(response => {
      const { success, errors } = response;

      if (success) {
        props.updateExpenseList(success);
        props.close();
      }
      if (errors) {
        setErrorMsg(errors);
      }
    });
    // - if user not valid - redirect to login page
  };

  return (
    <div id="ExpenseModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{props.title}</p>
          <i
            className="close-modal far fa-times-circle"
            onClick={props.close}
          ></i>
        </div>
        <div className="modal-body">
          {errorMsg.length ? <p className="modal-error">{errorMsg[0].msg}</p> : null}
          <form id="expense-form">
            <Input
              type="text"
              title="Payee"
              name="payee"
              placeholder="who took your money?"
              onChange={handleChange}
            />
            <Input
              type="date"
              title="Date"
              name="date"
              onChange={handleChange}
            />
            <Input
              type="number"
              title="Amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
              onChange={handleChange}
            />
            <Select
              title="Payment Method"
              name="method"
              options={[...methods]}
              value={inputData.method}
              onChange={handleChange}
            />
            <Select
              title="Category"
              name="category"
              options={[...categories]}
              value={inputData.category}
              onChange={handleChange}
            />
            <Input
              type="text"
              title="Memo"
              name="memo"
              placeholder="anything to note?"
              onChange={handleChange}
            />
            <Button
              id="save-expense"
              className="btn btn-modal my"
              btnName="Save"
              action={saveExpense}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
