import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import register from "../../api/registerUser";
import Errors from "./Errors";

class Register extends Component {
  state = {
    newUser: {
      name: "",
      email: "",
      password: "",
      password2: ""
    },
    errors: [],
    success: false
  };

  handleChange = e => {
    const data = e.target;
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, [data.name]: data.value }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state.newUser;

    if (name && email && password && password2) {
      if (password === password2) {
        register(name, email, password).then(response => {
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
    const errors = this.state.errors.map(err => (
      <Errors key={err.msg} error={err.msg} />
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
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={this.state.password2}
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
