import React, { Component } from "react";
import { Link } from "react-router-dom";
import authenticate from "../../api/authUser";
import { Alert } from "./Alert";

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
          this.props.history.push("/user/expenses");
        }
        if (errors) {
          this.setState({ successMsg: "", errors });
        }
      });
    } else {
      this.setState({
        successMsg: "",
        errors: [{ msg: "All fields are required" }]
      });
    }
  };

  render() {
    const { email, password, errors, successMsg: success } = this.state;
    const errorMsg = errors.map((err, index) => (
      <Alert key={index} className={"alert alert-danger"} message={err.msg} />
    ));

    return (
      <div className="wrapper">
        <h1 className="large text-golden">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        {errorMsg}
        {success ? (
          <Alert className={"alert alert-success"} message={success.msg} />
        ) : null}
        <form className="form" onSubmit={this.handleSubmit} noValidate>
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
          <input type="submit" className="btn btn-standard" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    );
  }
}

export default Login;
