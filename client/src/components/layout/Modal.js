import React, { useState } from "react";
import { Input, Select } from "./InputFields";
import { Button } from "./Button";

export const Modal = props => {
  // these will be updated  via API call to users saved lists
  const methods = ["Cash", "Credit Card", "Debit Card", "Paypal", "Apple Pay"];

  const categories = ["Groceries", "Gas", "Dining Out", "Clothes", "Misc"];

  const [inputData, setInputData] = useState({
    payee: "",
    date: "",
    amount: "",
    method: "",
    category: "",
    memo: ""
  });

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveExpense = e => {
    e.preventDefault();
    // get input from modal fields
    // validate user
    // - if not valid - redirect to login page
    // - else
    // - -- post input to /user/expenses
    // - -- update state with expense
    // - -- close modal (set showModal to false)
    console.log(inputData);
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
          <form id="expense-form">
            <Input
              type="text"
              title="Payee"
              name="payee"
              placeholder="who was the payment to?"
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
