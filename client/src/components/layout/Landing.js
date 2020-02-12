import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Expense Tracker</h1>
          <div className="lead">
            <p className="p">
              Ever wonder why the cash you just got from the ATM disappeared so
              fast?
            </p>
            <p className="p">
              Expense Tracker is a simple app to help you track those "on the
              go" expenses that devour your cash without a trace (or a receipt).
            </p>
            <p className="p">
              In just a few steps, you can record that $5 cup of coffee or $8
              bagel with cream cheese.
            </p>
            <p className="p highlight">
              All you have to do is register, log in, and give it a try!
            </p>
          </div>
          <div className="buttons">
            <Link to="/register" className="btn btn-standard">
              Sign me up!
            </Link>
            <Link to="/login" className="btn btn-standard">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
