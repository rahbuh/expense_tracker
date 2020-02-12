import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <a href="index.html">Expense Tracker</a>
      </h1>
      <ul>
        <li>
          <a href="#">Register</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
