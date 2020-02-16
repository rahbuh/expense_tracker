import React from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
    <h1><Link to='/'>Expense Tracker</Link></h1>
    {/* <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Log In</Link></li>
    </ul> */}
  </nav>
  );
};

export default Navbar;
