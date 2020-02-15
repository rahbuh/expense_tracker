import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Errors from "./Errors";
import Success from "./Success";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    registrationSuccess: ""
  };

  componentDidMount() {
    const successMsg = this.props.location.state;
    if (successMsg) {
      this.setState({
        registrationSuccess: successMsg
      });
    }
  }

  render() {
    const errors = this.state.errors.map(err => (
      <Errors key={err.msg} error={err.msg} />
    ));
    const success = this.state.registrationSuccess;

    return (
      <Fragment>
        <h1 className="large text-golden">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        {errors}
        {success ? <Success msg={success.msg} /> : null}
        <form className="form" action="dashboard.html">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
            />
          </div>
          <input type="submit" className="btn btn-standard" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    );
  }
}

export default Login;
