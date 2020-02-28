import React, { useState } from "react";
import { Input, Select } from "./InputFields";
import { Button } from "./Button";
import { postExpenseAPI, updateExpenseAPI } from "../../api/userExpense";

export const Modal = props => {
  const token = props.token; // WILL BE SET BY LOGIN

  const [inputData, setInputData] = useState({ ...props.expenseData });
  const [errorMsg, setErrorMsg] = useState([]);

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const saveExpense = async e => {
    e.preventDefault();
    const handleResponse = result => {
      if (result.success) {
        // UPDATE EXPENSES
        props.close();
      }
      if (result.errors) {
        setErrorMsg(result.errors);
      }
      if (result.status) {
        console.log("Post Error Status: ", result.status);
      }
    };

    if (props.type.modal === "new") {
      handleResponse(await postExpenseAPI(inputData, token));
    }

    if (props.type.modal === "edit") {
      handleResponse(await updateExpenseAPI(inputData, token));
    }
    // IF USER NOT VALID, REDIRECT TO LOGIN PAGE
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
              options={[...props.paytype.sort()]}
              onChange={handleChange}
            />
            <Select
              defaultValue={inputData.category}
              title="Category"
              name="category"
              options={[...props.categories.sort()]}
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
