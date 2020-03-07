import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth";
import { Alert } from "./Alert";

const Login = () => {
  const { user, errors, handleChange, handleSubmit } = useContext(AuthContext);

  if (user.isLoggedIn) {
    // return <Redirect to="/user/expenses" />;
    console.log("IsLoggedIn = true")
  }

  const alert = errors.map((error, index) => (
    <Alert key={index} className={"alert alert-danger"} message={error.msg} />
  ));

  return (
    <div className="wrapper">
      <h1 className="large text-golden">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      {alert}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <input type="submit" className="btn btn-standard" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
