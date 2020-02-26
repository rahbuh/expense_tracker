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

  const [inputData, setInputData] = useState({
    payee: "",
    date: "",
    amount: "",
    method: "",
    category: "",
    memo: ""
  });

  const [errorMsg, setErrorMsg] = useState([]);

  // setInputData(prevState => ({
  //     ...prevState,
  //     ...update
  //   }));

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveExpense = e => {
    e.preventDefault();
    console.log(inputData);
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
              type="text"
              title="Payee"
              name="payee"
              value={inputData.payee}
              placeholder="who took your money?"
              onChange={handleChange}
            />
            <Input
              type="date"
              title="Date"
              name="date"
              value={inputData.date}
              onChange={handleChange}
            />
            <Input
              type="number"
              title="Amount"
              name="amount"
              value={inputData.amount}
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
              value={inputData.memo}
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
