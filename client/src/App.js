import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <div id="main">
        <div class="headline">
          <p>
            Ever wonder why the cash you just got from the ATM disappears so
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
        <div class="button-wrapper">
          <button class="btn btn-register ">Sign me up!</button>
          <button class="btn btn-login">Log me in!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
