import React, { useState } from "react";
import { InputField, SelectField } from "./InputField";
import { Button } from "./Button";

export const Modal = props => {
  // these will be updated via API call to users saved lists
  const methods = ["Cash", "Credit Card", "Debit Card", "Paypal", "Apple Pay"];
  const categories = ["Groceries", "Gas", "Dining Out", "Clothes", "Misc"];

  const [inputData, setInputData] = useState({ payee: "", amount: null });

  const saveExpense = e => {
    e.preventDefault();
    console.log("button clicked");
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
            <InputField
              type="text"
              title="Payee"
              name="payee"
              placeholder="who was the payment to?"
            />
            <InputField type="date" title="Date" name="trans-date" />
            <InputField
              type="number"
              title="Amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
            />
            <SelectField
              title="Payment Method"
              name="pay-method"
              options={[...methods]}
            />
            <SelectField
              title="Category"
              name="category"
              options={[...categories]}
            />
            <InputField
              type="text"
              title="Memo"
              name="memo"
              placeholder="anything to note?"
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
