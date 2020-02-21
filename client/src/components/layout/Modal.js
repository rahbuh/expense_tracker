import React, { useState } from "react";
import { Input, Select } from "./InputFields";
import { Button } from "./Button";

import postExpense from "../../api/userExpense";
// import { response } from "express";

export const Modal = props => {
  // these will be updated  via API call to users saved lists
  const methods = ["Cash", "Credit Card", "Debit Card", "Paypal", "Apple Pay"];
  const categories = ["Groceries", "Gas", "Dining Out", "Clothes", "Misc"];
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0ZTFiZGE0ZDFiYWUzY2M0NDU5NzE0In0sImlhdCI6MTU4MjI1OTc3OCwiZXhwIjoxNTgyMjYzMzc4fQ.t3_kKDWBksEPI7_Rd0C41BddgIqTq_410jN7sAyP4pI";

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
    postExpense(inputData, token).then(response => {
      const { success, errors } = response;

      if (success) {
        console.log("Success: ", success);
      }
      if (errors) {
        console.log("Errors: ", errors);
        setErrorMsg(errors)
      }
      
      console.log(errorMsg)
    });
    // - if user not valid - redirect to login page
    // - else
    // - -- post input to /user/expenses
    // - -- update state with expense
    // props.close();
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
