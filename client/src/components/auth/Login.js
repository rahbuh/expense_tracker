import React from "react";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../context/authContext";

const Login = props => {
  return (
    <AuthConsumer>
      {context => (
        <div className="wrapper">
          <h1 className="large text-golden">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign into Your Account
          </p>
          {context.alert}
          {/*{context.success}*/}
          <form className="form" onSubmit={context.handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={context.handleChange}
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={context.handleChange}
                autoComplete="off"
              />
            </div>
            <input type="submit" className="btn btn-standard" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      )}
    </AuthConsumer>
  );
};

export default Login;
