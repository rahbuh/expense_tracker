import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth";

const Navbar = () => {
  const {user, handleLogOut} = useContext(AuthContext);

  return (
    <nav className="navbar">
      {user.isLoggedIn ? (
        <Fragment>
          <div id="home">
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
            <p style={{ color: "#fff" }}>Welcome, {user.username}!</p>
          </div>
          <ul>
            <li>
              <Link to="/user/expenses">My Expenses</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogOut}>
                Log Out
              </Link>
            </li>
          </ul>
        </Fragment>
      ) : (
        <Fragment>
          <div id="home">
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </Fragment>
      )}
    </nav>
  );
};

export default Navbar;
