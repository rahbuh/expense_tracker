import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../context/authContext";

const Navbar = () => {
  return (
    <AuthConsumer>
      {context => (
        <nav className="navbar">
          {context.user.isLoggedIn ? (
            <Fragment>
              <div id="home">
                <Link to="/"><i className="fas fa-home"></i></Link>
                <p style={{ color: "#fff" }}>Welcome, {context.user.username}!</p>
              </div>
              <ul>
                <li><Link to="/user/expenses">My Expenses</Link></li>
                <li><Link to="/" onClick={context.handleLogOut}>Log Out</Link></li>
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              <div id="home">
                <Link to="/"><i className="fas fa-home"></i></Link>
              </div>
              <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Log In</Link></li>
              </ul>
            </Fragment>
          )}
        </nav>
      )}
    </AuthConsumer>
  );
};

export default Navbar;
