import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import authenticate from "../../api/authUser";
import Errors from "./Errors";
import Success from "./Success";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    errors: [],
    successMsg: ""
  };

  componentDidMount() {
    const successMsg = this.props.location.state;
    if (successMsg) {
      this.setState({
        successMsg: successMsg
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      authenticate(email, password).then(response => {
        const { token, errors } = response;
        if (token) {
          this.setState({ token });
          this.props.history.push("/user/expenses")
        }
        if (errors) {
          this.setState({ successMsg: "", errors });
        }
      });
    } else {
      this.setState({ successMsg: "", errors: [{ msg: "All fields are required" }] });
    }
  };

  render() {
    const errors = this.state.errors.map(err => (
      <Errors key={err.msg} error={err.msg} />
    ));
    const success = this.state.successMsg;

    return (
      <Fragment>
        <h1 className="large text-golden">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        {errors}
        {success ? <Success msg={success.msg} /> : null}
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={this.handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
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
