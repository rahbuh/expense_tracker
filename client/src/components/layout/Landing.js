import React from "react";

const Landing = () => {
  return (
    <div id="main">
      <div className="headline">
        <p>
          Ever wonder why the cash you just got from the ATM disappeared so
          fast?
        </p>
        <p>
          <strong>Expense Tracker</strong> is a simple app to help you track
          those "on the go" expenses that devour your cash without a trace{" "}
          <em>(or a receipt)</em>. In just a few steps, you can record that $5
          cup of coffee or $8 bagel with cream cheese.
        </p>
        <p>
          <strong>
            All you have to do is register, log in, and give it a try!
          </strong>
        </p>
      </div>

      <div className="button-wrapper">
        <button className="btn btn-register ">Sign me up!</button>
        <button className="btn btn-login">Log me in!</button>
      </div>
    </div>
  );
};

export default Landing;
