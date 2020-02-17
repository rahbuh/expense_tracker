import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import register from "../../api/registerUser";
import Alert from "./Alert";

class Register extends Component {
  state = {
    newUser: {
      username: "",
      email: "",
      password: "",
      password2: ""
    },
    errors: [],
    success: false
  };

  handleChange = e => {
    const userData = this.state.newUser;
    userData[e.target.name] = e.target.value;
    this.setState(userData);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state.newUser;

    if (username && email && password && password2) {
      if (password === password2) {
        register(username, email, password).then(response => {
          const { success, errors } = response;

          if (success) {
            this.setState({ success });
          }
          if (errors) {
            this.setState({ errors });
          }
        });
      } else {
        this.setState({ errors: [{ msg: "Passwords must match" }] });
      }
    } else {
      this.setState({ errors: [{ msg: "All fields are required" }] });
    }
  };

  render() {
    const errors = this.state.errors.map((err, index) => (
      <Alert key={index} className={"alert alert-danger"} message={err.msg} />
    ));

    if (this.state.success) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { msg: "Registration successful. Please log in." }
          }}
        />
      );
    }

    const { username, email, password, password2 } = this.state.newUser;

    return (
      <Fragment>
        <h1 className="large text-golden">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        {errors}
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={username}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>
          <input type="submit" className="btn btn-standard" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
  }
}

export default Register;
