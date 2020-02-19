import React from "react";

export const Modal = props => {
  return (
    <div id="ExpenseModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{props.title}</p>
          <i className="close-modal far fa-times-circle" onClick={props.close}></i>
        </div>
        <div className="modal-body">
        <form id="expense-form">
          {/* payee */}
          <label htmlFor="expense-name">Payee</label>
          <input type="text" name="expense-name" id="expense-name" autoFocus />
          {/* date */}
          <label htmlFor="trans-date">Date</label>
          <input type="date" name="trans-date" id="trans-date" />
          {/* amount */}
          <label htmlFor="amount">Amount </label>
          <input type="number" name="amount" id="amount" placeholder="0.00" step="0.01" />
          {/* payment method */}
          <label htmlFor="pay-method">Payment Method </label>
          <select name="pay-method" id="pay-method">
            <option defaultValue>Select an Option</option>
            <option value="cash">Cash</option>
            <option value="credit card">Credit Card</option>
            <option value="debit card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="apple pay">ApplePay</option>
          </select>
          {/* category */}
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option defaultValue>Select an Option</option>
            <option value="groceries">Groceries</option>
            <option value="gas">Gas</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="misc">Misc</option>
          </select>
          {/* memo */}
          <label htmlFor="memo">Memo</label>
          <input type="text" name="memo" id="memo" />
          {/* submit */}
          <input type="submit" id="save-expense" className="btn btn-modal my" value="Save" />
        </form>
      </div>
      </div>
    </div>
  );
};
